import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useApi';

const BENEFITS = [
  { icon: '🎭', title: 'Spectacular Cultural Events', desc: 'Four major celebrations: Sankranti, Ugadi, Vanabhojana, and the grand Deepavali/Rajyotsava event.' },
  { icon: '👐', title: 'Community & Belonging', desc: 'Build genuine friendships with fellow Kannadigas who share your roots, language, and culture.' },
  { icon: '🎓', title: 'Scholarship Access', desc: 'Your children may be eligible for the prestigious Muteri Scholarship Program.' },
  { icon: '❤️', title: 'Give Back', desc: 'Participate in NKK\'s charitable drives, volunteer programs, and community service initiatives.' },
];

const EVENTS_INCLUDED = [
  { emoji: '🌾', name: 'Sankranti', desc: 'Harvest festival · January' },
  { emoji: '🌸', name: 'Ugadi', desc: 'Kannada New Year · March/April' },
  { emoji: '🌳', name: 'Vanabhojana', desc: 'Community Picnic · Summer' },
  { emoji: '🪔', name: 'Rajyotsava', desc: 'Grand Celebration · November' },
];

const FEATURES = [
  'Access to all NKK events (Sankranti, Ugadi, Vanabhojana, Rajyotsava)',
  'Vote in NKK elections and have a voice in the community',
  'Connect with 1200+ Kannadiga families in Greater Atlanta',
  'Priority registration for events and programs',
  'Access to NKK scholarship opportunities for children',
  'Participate in volunteer and charity drives',
  'NKK newsletter and communication updates',
  'Discounted rates for vendor booths and advertising',
];

export default function Membership() {
  useScrollReveal();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <header className="page-header">
        <div className="page-tag">2026 Membership</div>
        <h1 className="page-title">Join the <span className="gradient-text">NKK Family</span></h1>
        <p className="page-subtitle">Connect with 1200+ Kannada families. Celebrate your culture. Build lifelong friendships.</p>
        <div className="divider" />
      </header>

      <section>
        <div className="container">
          <div className="grid-2" style={{ gap: '3rem', alignItems: 'start' }}>
            {/* Card */}
            <div className="reveal">
              <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', background: 'linear-gradient(135deg,rgba(200,132,26,0.08),rgba(124,58,237,0.08))', border: '1px solid rgba(200,132,26,0.2)' }}>
                <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>🌟</div>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', marginBottom: '0.5rem' }}>NKK Family Membership</h2>
                <div style={{ fontFamily: 'var(--font-kannada)', fontSize: '1rem', color: 'var(--color-primary-2)', marginBottom: '1.5rem' }}>ಕುಟುಂಬ ಸದಸ್ಯತ್ವ — 2026</div>
                <div className="membership-price">Annual</div>
                <div className="membership-period">2026 Season Membership</div>
                <ul className="membership-features">
                  {FEATURES.map(f => <li key={f}>{f}</li>)}
                </ul>
                <a
                  href="https://www.zeffy.com/en-US/ticketing/nrupathunga-kannada-koota-nkk-atlanta-membership--2026"
                  target="_blank" rel="noopener noreferrer"
                  className="btn btn-gold"
                  style={{ width: '100%', justifyContent: 'center', fontSize: '1.05rem', padding: '1rem 2rem' }}
                >
                  🎉 Register for Membership 2026 →
                </a>
                <p style={{ marginTop: '1rem', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Powered by Zeffy · Secure registration</p>
              </div>
            </div>

            {/* Benefits */}
            <div className="reveal reveal-delay-2">
              <div className="section-tag">Why Join NKK?</div>
              <h2 className="section-title" style={{ textAlign: 'left', fontSize: '2rem' }}>
                Experience the Best of <span className="accent">Karnataka</span>
              </h2>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem', lineHeight: 1.8 }}>
                NKK membership means you're part of a community that keeps its culture alive, celebrates together, and helps each other grow.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {BENEFITS.map(b => (
                  <div key={b.title} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(200,132,26,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', flexShrink: 0 }}>{b.icon}</div>
                    <div>
                      <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{b.title}</div>
                      <div style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>{b.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '2.5rem', padding: '1.5rem', background: 'rgba(200,132,26,0.06)', borderRadius: '16px', border: '1px solid rgba(200,132,26,0.15)' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-primary-2)', marginBottom: '0.75rem' }}>Also Available</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <a href="https://www.atlantakannada.org/emailvendorbooth" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>🏪 NKK Advertising & Vendor Booth Options →</a>
                  <a href="https://www.atlantakannada.org/company-match-benefits-nkk" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>🏢 Company Match Benefits for NKK →</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Included */}
      <section style={{ padding: '4rem 2rem', background: 'linear-gradient(180deg,rgba(124,58,237,0.04),transparent)' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-tag">Included with Membership</div>
            <h2 className="section-title">Your <span className="accent">Year</span> of Celebrations</h2>
          </div>
          <div className="grid-4">
            {EVENTS_INCLUDED.map((e, i) => (
              <div className={`glass-card reveal${i ? ` reveal-delay-${i}` : ''}`} key={e.name} style={{ padding: '2rem', textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{e.emoji}</div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', color: 'var(--color-primary-2)', marginBottom: '0.5rem' }}>{e.name}</h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
