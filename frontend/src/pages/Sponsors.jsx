import { useEffect, useState } from 'react';
import { useScrollReveal } from '../hooks/useApi';

const TIER_CONFIG = {
  diamond: { label: '💎 Diamond Sponsor',       badgeClass: 'diamond', pillClass: 'pill-diamond', cardClass: 'diamond-card' },
  gold:    { label: '🥇 Gold Sponsors & Donors', badgeClass: 'gold',    pillClass: 'pill-gold',    cardClass: 'gold-card'    },
  silver:  { label: '🥈 Silver Sponsors',        badgeClass: 'silver',  pillClass: 'pill-silver',  cardClass: 'silver-card'  },
  general: { label: '💙 General Donors',          badgeClass: 'general', pillClass: 'pill-general', cardClass: ''             },
};

function TierSection({ tier, sponsors }) {
  useScrollReveal([sponsors.length]);
  if (!sponsors.length) return null;
  const cfg = TIER_CONFIG[tier];
  const isDiamond = tier === 'diamond';

  return (
    <>
      <div className="tier-header reveal" style={{ marginTop: '5rem', marginBottom: '3rem' }}>
        <div className={`tier-badge ${cfg.badgeClass}`}>{cfg.label}</div>
        <div className="tier-divider" />
      </div>
      <div className={`sponsors-grid${isDiamond ? ' diamond-grid' : ''}`} style={tier === 'general' ? { gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' } : {}}>
        {sponsors.map((s, i) => (
          tier === 'general' ? (
            <div key={s.id} className={`sponsor-card reveal${i > 0 && i < 4 ? ` reveal-delay-${i}` : ''}`} style={{ padding: '1rem', flexDirection: 'row', alignItems: 'center', gap: '0.75rem', minHeight: 'auto' }}>
              <div style={{ fontSize: '1.5rem' }}>💙</div>
              <div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.95rem', fontWeight: 600 }}>{s.name}</div>
                {s.description && <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{s.description}</div>}
              </div>
            </div>
          ) : (
            <div key={s.id} className={`sponsor-card ${cfg.cardClass} reveal${i > 0 && i < 4 ? ` reveal-delay-${i}` : ''}`}>
              {s.image_url
                ? <img
                    className={`sponsor-photo${tier === 'silver' || tier === 'gold' ? ' logo-style' : ''}`}
                    src={s.image_url}
                    alt={s.name}
                    loading="lazy"
                  />
                : <div className="sponsor-placeholder">
                    {tier === 'diamond' ? '💎' : tier === 'gold' ? '🥇' : tier === 'silver' ? '🥈' : '✨'}
                    <span>{s.name}</span>
                  </div>
              }
              <div className="sponsor-info">
                <div className={`sponsor-tier-pill ${cfg.pillClass}`}>{cfg.label.split(' ')[0]} {tier.charAt(0).toUpperCase() + tier.slice(1)}</div>
                <div className="sponsor-name">{s.name}</div>
                {s.description && <div className="sponsor-desc">{s.description}</div>}
              </div>
            </div>
          )
        ))}
      </div>
    </>
  );
}

export default function Sponsors() {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch('/api/sponsors?year=2026')
      .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
      .then(data => setSponsors(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const byTier = tier => sponsors.filter(s => s.tier === tier);
  const generalSponsors = byTier('general');

  return (
    <>
      <div className="page-hero">
        <div className="section-tag">Our Supporters</div>
        <h1 className="section-title" style={{ marginTop: '1rem' }}>Sponsors &amp; Donors <span className="accent">2026</span></h1>
        <p className="page-subtitle" style={{ maxWidth: '600px', margin: '1.5rem auto 0' }}>
          Keeping Karnataka's cultural legacy alive in Atlanta through the generous support of our community partners.
        </p>
      </div>

      <section style={{ padding: '0 2rem 10rem' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>

          <div className="reveal" style={{ textAlign: 'center', marginBottom: '5rem', padding: '4rem 2rem', background: 'rgba(255,255,255,0.02)', borderRadius: '32px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', marginBottom: '1rem' }}>Heartfelt Gratitude</h2>
            <p style={{ color: 'var(--color-text-muted)', maxWidth: '750px', margin: '0 auto', lineHeight: 1.8 }}>
                NKK Atlanta is a volunteer-run non-profit IRS 501(c)(3). Your sponsorship directly funds festivals, student scholarships, and community outreach. ಧನ್ಯವಾದಗಳು!
            </p>
          </div>

          {loading && (
            <div style={{ textAlign: 'center', padding: '6rem 0' }}>
              <div className="loading-spinner" style={{ width: 48, height: 48, margin: '0 auto' }} />
              <p style={{ marginTop: '1.5rem', opacity: 0.5 }}>Loading sponsors...</p>
            </div>
          )}

          {!loading && !error && (
            <>
              <TierSection tier="diamond" sponsors={byTier('diamond')} />
              <TierSection tier="gold"    sponsors={byTier('gold')} />
              <TierSection tier="silver"  sponsors={byTier('silver')} />

              {generalSponsors.length > 0 && (
                <>
                  <TierSection tier="general" sponsors={generalSponsors} />
                  
                  <div style={{ marginTop: '4rem' }} className="reveal">
                    <div style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-primary-2)', marginBottom: '1.5rem' }}>Additional Donors</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                      {['Srikanth Honnaiah','Kavitha Lakshminarasaiah','Srinivasa Channagiri','Mukund Galgali',
                        'Rohith Sathyaprakash','Vinay Nataraja','Sridhar Venkatagiriyappa','Santosh Hegde',
                        'Srivijaya Srinivasa','Latha Airodi','Nakul Upadhya','Vineet Upadhya'].map(d => (
                        <div key={d} style={{ padding: '0.5rem 1.25rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '100px', fontSize: '0.85rem' }}>
                          {d}
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </>
          )}

          <div style={{ marginTop: '8rem', textAlign: 'center' }} className="reveal">
             <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Become a Sponsor</h2>
             <p style={{ color: 'var(--color-text-muted)', marginBottom: '2.5rem' }}>Join us in supporting the Kannada community.</p>
             <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                <a href="https://www.zeffy.com/en-US/ticketing/nkk-annual-donations--2026" target="_blank" rel="noopener noreferrer" className="btn btn-gold">Donate Now</a>
                <a href="https://www.atlantakannada.org/sponsorship-packages-2026" target="_blank" rel="noopener noreferrer" className="btn btn-outline">Packages</a>
             </div>
          </div>

        </div>
      </section>
    </>
  );
}
