import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useApi';

/**
 * TeamMemberCard — A stable, high-fidelity card with a slide-up bio detail.
 * This avoids off-screen issues by keeping the bio strictly within the card.
 */
function TeamMemberCard({ member }) {
  const [isHovered, setIsHovered] = useState(false);
  const imgSrc = member.image_url || null;

  return (
    <div 
      className="team-hover-card reveal"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsHovered(h => !h)}
      style={{
        position: 'relative',
        borderRadius: '24px',
        overflow: 'hidden',
        background: 'var(--color-surface)',
        boxShadow: isHovered ? '0 20px 50px rgba(0,0,0,0.5)' : '0 10px 30px rgba(0,0,0,0.2)',
        transform: isHovered ? 'translateY(-10px) scale(1.02)' : 'translateY(0) scale(1)',
        transition: 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)',
        aspectRatio: '0.8'
      }}
    >
      {/* Media Layer */}
      <div style={{ position: 'absolute', inset: 0 }}>
        {imgSrc ? (
          <img 
            src={imgSrc} 
            alt={member.name} 
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease', transform: isHovered ? 'scale(1.1)' : 'scale(1)' }} 
          />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '5rem', background: 'linear-gradient(135deg,rgba(124,58,237,0.2),rgba(200,132,26,0.15))' }}>
            {member.avatar_emoji || '👤'}
          </div>
        )}
      </div>

      {/* Default Overlay (visible when not hovered) */}
      <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(10,6,18,0.95) 0%, rgba(10,6,18,0.6) 30%, transparent 60%)',
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
          padding: '2rem 1.5rem',
          opacity: isHovered ? 0 : 1,
          transition: 'opacity 0.4s ease',
          pointerEvents: 'none'
      }}>
          <div style={{ color: 'var(--color-primary-2)', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.4rem' }}>{member.role}</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', marginBottom: '0.2rem' }}>{member.name}</div>
      </div>

      {/* Hover Information Layer (Slides Up) */}
      <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(18, 13, 31, 0.95)',
          backdropFilter: 'blur(15px)',
          padding: '2rem',
          display: 'flex', flexDirection: 'column',
          justifyContent: 'center',
          transform: isHovered ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)',
          pointerEvents: isHovered ? 'auto' : 'none'
      }}>
          <div style={{ color: 'var(--color-primary-2)', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.75rem', letterSpacing: '0.15em' }}>{member.role}</div>
          <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', marginBottom: '1.25rem', fontFamily: 'var(--font-heading)' }}>{member.name}</h3>
          
          <div className="custom-scroll" style={{ 
              fontSize: '0.92rem', color: 'rgba(255,255,255,0.85)', 
              lineHeight: '1.7', overflowY: 'auto', 
              flex: 1, paddingRight: '0.5rem' 
          }}>
              {member.bio}
          </div>
          
          {member.bio?.length > 300 && (
              <div style={{ fontSize: '0.7rem', color: 'var(--color-primary-2)', marginTop: '1rem', fontStyle: 'italic', textAlign: 'right' }}>
                  Scroll for more ↓
              </div>
          )}
      </div>
    </div>
  );
}

function TeamGroup({ label, members, revealDeps }) {
  useScrollReveal(revealDeps);
  if (!members.length) return null;
  return (
    <>
      <div className="group-heading reveal" style={{ marginTop: '5rem', marginBottom: '3.5rem' }}>
        <span className="group-label" style={{ fontSize: '1rem', fontWeight: 700, letterSpacing: '0.3em', opacity: 0.6 }}>{label}</span>
        <div className="group-line" style={{ height: '1px', background: 'linear-gradient(to right, rgba(200,132,26,0.5), transparent)', flex: 1, marginLeft: '2rem' }} />
      </div>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
        gap: '2.5rem'
      }}>
        {members.map(m => <TeamMemberCard key={m.id} member={m} />)}
      </div>
    </>
  );
}

export default function Team() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch('/api/team')
      .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
      .then(setMembers)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const sorted = [...members].sort((a,b) => (a.order_index || 0) - (b.order_index || 0));
  const trustees = sorted.filter(m => m.category === 'trustee');
  const ec       = sorted.filter(m => m.category === 'ec');
  const bod      = sorted.filter(m => m.category === 'bod');

  return (
    <>
      <div className="page-hero">
        <div className="section-tag" style={{ background: 'rgba(212,41,42,0.1)', color: 'var(--color-primary)' }}>Our Leadership</div>
        <h1 className="section-title" style={{ marginTop: '0.75rem' }}>NKK Atlanta <span className="accent">2026</span></h1>
        <p className="page-subtitle" style={{ maxWidth: '600px', margin: '1.5rem auto 0' }}>
            The volunteers working tirelessly to preserve and promote Karnataka's rich cultural heritage. 
            <strong> Hover over any card to view their story.</strong>
        </p>
      </div>

      <section style={{ padding: '0 2rem 8rem' }}>
        <div className="container" style={{ maxWidth: '1300px' }}>

          {loading && (
            <div style={{ textAlign: 'center', padding: '6rem 0' }}>
              <div className="loading-spinner" style={{ width: 48, height: 48, margin: '0 auto' }} />
              <p style={{ marginTop: '1.5rem', opacity: 0.5 }}>Loading leadership team...</p>
            </div>
          )}

          {!loading && !error && (
            <>
              <TeamGroup label="BOARD OF TRUSTEES"   members={trustees} revealDeps={[trustees.length]} />
              <TeamGroup label="EXECUTIVE COMMITTEE"  members={ec}       revealDeps={[ec.length]} />
              <TeamGroup label="BOARD OF DIRECTORS"   members={bod}      revealDeps={[bod.length]} />
            </>
          )}

          <div className="reveal" style={{ marginTop: '8rem', textAlign: 'center', padding: '6rem 3rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '40px' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', marginBottom: '1.5rem' }}>Join the Journey</h2>
            <p style={{ color: 'var(--color-text-muted)', maxWidth: '540px', margin: '0 auto 2.5rem', fontSize: '1.1rem' }}>
              Interested in volunteering or becoming a board member? We are always looking for passionate individuals.
            </p>
            <Link to="/contact#volunteer" className="btn btn-gold">🙋 Volunteer Signup</Link>
          </div>
        </div>
      </section>
    </>
  );
}
