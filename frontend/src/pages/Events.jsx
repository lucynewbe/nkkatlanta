import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useApi';

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useScrollReveal([events.length]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch('/api/events')
      .then(r => r.json())
      .then(setEvents)
      .catch(() => setEvents([]))
      .finally(() => setLoading(false));
  }, []);

  const upcomingEvent = events.find(e => e.is_upcoming) || events[0];
  const calendarEvents = events.filter(e => e.id !== upcomingEvent?.id);

  return (
    <>
      <header className="page-header">
        <div className="page-tag">Celebrations</div>
        <h1 className="page-title">Annual <span className="gradient-text">Events</span></h1>
        <p className="page-subtitle">Extraordinary celebrations that bring the Kannada community together — rooted in tradition, alive with joy.</p>
        <div className="divider" />
      </header>

      <section style={{ paddingBottom: '3rem' }}>
        <div className="container">
          {loading && (
            <div style={{ textAlign: 'center', padding: '4rem' }}>
              <div className="loading-spinner" style={{ width: 40, height: 40, margin: '0 auto' }} />
              <p style={{ color: 'var(--color-text-muted)', marginTop: '1rem' }}>Loading events…</p>
            </div>
          )}

          {!loading && upcomingEvent && (
            <>
              <div className="section-tag" style={{ marginBottom: '1.5rem', textAlign: 'center', color: '#ffd700', background: 'rgba(255,215,0,0.1)' }}>⭐ Next Upcoming Event</div>
              <div className="glass-card reveal" style={{ marginBottom: '5rem', overflow: 'hidden', border: '1px solid var(--color-primary-2)' }}>
                <div style={{
                  padding: '3rem', display: 'flex', flexDirection: 'column', gap: '2.5rem',
                  background: 'linear-gradient(135deg,rgba(124,58,237,0.15),rgba(200,132,26,0.1))'
                }}>
                  <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
                     <div style={{ width: 140, height: 140, borderRadius: '16px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#2d2438', border: '2px solid rgba(255,255,255,0.1)', flexShrink: 0 }}>
                       {upcomingEvent.image_url ? (
                         <img src={upcomingEvent.image_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                       ) : (
                         <span style={{ fontSize: '4.5rem' }}>{upcomingEvent.emoji}</span>
                       )}
                     </div>
                     <div style={{ flex: 1, minWidth: '300px' }}>
                       <div style={{ fontSize: '1rem', fontWeight: 800, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--color-primary-2)', marginBottom: '0.5rem', display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                         {(upcomingEvent.date || upcomingEvent.month) && <span>📅 {upcomingEvent.date || `${upcomingEvent.month} · ${upcomingEvent.season}`}</span>}
                         {upcomingEvent.time_start && (
                           <span>
                             ⏰ {new Date(`1970-01-01T${upcomingEvent.time_start}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                             {upcomingEvent.time_end && ` - ${new Date(`1970-01-01T${upcomingEvent.time_end}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`}
                           </span>
                         )}
                       </div>
                       <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.8rem', fontWeight: 800, marginBottom: '0.25rem', lineHeight: 1.1 }}>{upcomingEvent.title}</h2>
                       {upcomingEvent.title_kn && <div style={{ fontFamily: 'var(--font-kannada)', fontSize: '1.25rem', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>{upcomingEvent.title_kn}</div>}
                     </div>
                     <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: '200px' }}>
                         {upcomingEvent.register_url && (
                             <a href={upcomingEvent.register_url} target="_blank" rel="noopener noreferrer" className="btn btn-gold" style={{ textAlign: 'center', padding: '1rem' }}>✨ Register Now</a>
                         )}
                     </div>
                  </div>
                  
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2.5rem' }}>
                    <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.9, marginBottom: '1.5rem', fontSize: '1.15rem', maxWidth: '800px' }}>{upcomingEvent.description}</p>
                    
                    {upcomingEvent.location && (
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem', color: 'var(--color-primary-2)', fontWeight: 500, background: 'rgba(255,255,255,0.05)', padding: '0.75rem 1.5rem', borderRadius: '100px' }}>
                            <span style={{ fontSize: '1.2rem' }}>📍</span>
                            <span style={{ color: '#fff' }}>{upcomingEvent.location}</span>
                        </div>
                    )}

                    {upcomingEvent.highlights?.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                        {upcomingEvent.highlights.map(h => (
                          <span key={h} style={{
                            padding: '0.5rem 1.25rem', borderRadius: '100px',
                            background: 'rgba(200,132,26,0.15)', border: '1px solid rgba(200,132,26,0.3)',
                            color: 'var(--color-primary-2)', fontSize: '0.9rem', fontWeight: 600
                          }}>{h}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {calendarEvents.length > 0 && (
                 <>
                    <div className="section-header reveal" style={{ marginTop: '6rem' }}>
                      <div className="section-tag">2026 Calendar</div>
                      <h2 className="section-title">Other <span className="accent">Festivals</span></h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
                       {calendarEvents.map((ev, i) => (
                           <div key={ev.id} className={`glass-card reveal reveal-delay-${i % 3}`} style={{ padding: '2rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                                 <div style={{ fontSize: '2.5rem' }}>{ev.emoji}</div>
                                 <div>
                                    <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-primary-2)' }}>{ev.month}</div>
                                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem' }}>{ev.title}</h3>
                                 </div>
                              </div>
                              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: 1.6, flex: 1 }}>{ev.description}</p>
                           </div>
                       ))}
                    </div>
                 </>
              )}
            </>
          )}

          {!loading && events.length === 0 && (
            <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', padding: '4rem' }}>No events found.</p>
          )}

          <div style={{ textAlign: 'center', padding: '6rem 0 2rem' }} className="reveal">
            <h3 style={{ fontSize: '2rem', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>Support NKK Events</h3>
            <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', marginTop: '2rem', flexWrap: 'wrap' }}>
                <Link to="/membership" className="btn btn-gold">🌟 Become a Member</Link>
                <a href="https://www.zeffy.com/en-US/ticketing/nkk-annual-donations--2026" className="btn btn-outline" target="_blank" rel="noopener noreferrer">💛 Sponsor NKK</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
