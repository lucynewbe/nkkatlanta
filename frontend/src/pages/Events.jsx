import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useApi';
import Seo from '../components/Seo.jsx';
import PageHeader from '../components/PageHeader.jsx';
import { eventTimeRange } from '../utils/format.js';

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rsvp, setRsvp] = useState({ name: '', email: '', guests: 1 });
  const [rsvpStatus, setRsvpStatus] = useState(null);

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
  const time = eventTimeRange(upcomingEvent);

  const submitRsvp = async (e) => {
    e.preventDefault();
    if (!upcomingEvent) return;
    try {
      const res = await fetch(`/api/events/${upcomingEvent.id}/rsvp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rsvp),
      });
      if (!res.ok) throw new Error('failed');
      setRsvpStatus('success');
    } catch {
      setRsvpStatus('error');
    }
  };

  return (
    <>
      <Seo title="Events" description="NKK Atlanta annual celebrations — Ugadi, Sankranti, Vanabhojana, and Rajyotsava." />
      <PageHeader
        tag="Celebrations"
        title="Annual"
        accent="Events"
        subtitle="Extraordinary gatherings that bring the Kannada community together — rooted in tradition, alive with joy."
      />

      <section>
        <div className="container">
          {loading && (
            <div style={{ textAlign: 'center', padding: '4rem' }}>
              <div className="loading-spinner" style={{ width: 40, height: 40, margin: '0 auto' }} />
            </div>
          )}

          {!loading && upcomingEvent && (
            <>
              <div className="section-tag" style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Next upcoming event</div>
              <div className="glass-card featured-event reveal">
                <div className="featured-event-inner">
                  <div className="featured-event-top">
                    <div className="featured-thumb">
                      {upcomingEvent.image_url
                        ? <img src={upcomingEvent.image_url} alt="" />
                        : <span>{upcomingEvent.emoji}</span>}
                    </div>
                    <div style={{ flex: 1, minWidth: 260 }}>
                      <div className="ticket-meta" style={{ justifyContent: 'flex-start' }}>
                        {(upcomingEvent.date || upcomingEvent.month) && <span>{upcomingEvent.date || `${upcomingEvent.month} · ${upcomingEvent.season}`}</span>}
                        {time && <span>{time}</span>}
                      </div>
                      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem,4vw,2.8rem)', lineHeight: 1.1 }}>{upcomingEvent.title}</h2>
                      {upcomingEvent.title_kn && (
                        <div style={{ fontFamily: 'var(--font-kannada)', fontSize: '1.2rem', color: 'var(--color-text-muted)' }}>{upcomingEvent.title_kn}</div>
                      )}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {upcomingEvent.register_url && (
                        <a href={upcomingEvent.register_url} target="_blank" rel="noopener noreferrer" className="btn btn-gold">Register</a>
                      )}
                      <a href={`/api/events/${upcomingEvent.id}/ics`} className="btn btn-outline">Add to calendar</a>
                    </div>
                  </div>
                  <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.9, fontSize: '1.1rem' }}>{upcomingEvent.description}</p>
                  {upcomingEvent.location && <p className="ticket-loc" style={{ textAlign: 'left' }}>{upcomingEvent.location}</p>}
                  {upcomingEvent.highlights?.length > 0 && (
                    <div className="chip-row">
                      {upcomingEvent.highlights.map(h => <span key={h} className="chip">{h}</span>)}
                    </div>
                  )}

                  <div className="rsvp-box">
                    <h3 style={{ fontFamily: 'var(--font-heading)', marginBottom: '0.75rem' }}>RSVP / waitlist</h3>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>Tickets stay on Zeffy. This list helps volunteers plan seating and seva.</p>
                    {rsvpStatus === 'success' ? (
                      <p>Thank you — we received your RSVP.</p>
                    ) : (
                      <form onSubmit={submitRsvp} className="newsletter-bar">
                        <input className="form-input" required placeholder="Name" value={rsvp.name} onChange={e => setRsvp(r => ({ ...r, name: e.target.value }))} />
                        <input className="form-input" type="email" required placeholder="Email" value={rsvp.email} onChange={e => setRsvp(r => ({ ...r, email: e.target.value }))} />
                        <input className="form-input" type="number" min="1" style={{ maxWidth: 90 }} value={rsvp.guests} onChange={e => setRsvp(r => ({ ...r, guests: e.target.value }))} />
                        <button className="btn btn-primary" type="submit">RSVP</button>
                      </form>
                    )}
                    {rsvpStatus === 'error' && <p className="alert alert-error" style={{ marginTop: '0.75rem' }}>Could not save RSVP. Try again.</p>}
                  </div>
                </div>
              </div>

              {calendarEvents.length > 0 && (
                <>
                  <div className="section-header reveal" style={{ marginTop: '5rem' }}>
                    <div className="section-tag">Season</div>
                    <h2 className="section-title">Other <span className="accent">festivals</span></h2>
                  </div>
                  <div className="event-grid">
                    {calendarEvents.map((ev, i) => (
                      <div key={ev.id} className={`glass-card event-mini reveal reveal-delay-${i % 3}`}>
                        <div className="ticket-kicker">{ev.month}</div>
                        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem' }}>{ev.title}</h3>
                        <p style={{ color: 'var(--color-text-muted)', marginTop: '0.75rem', flex: 1 }}>{ev.description}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          )}

          <div style={{ textAlign: 'center', padding: '5rem 0 1rem' }} className="reveal">
            <h3 style={{ fontSize: '2rem', fontFamily: 'var(--font-heading)', marginBottom: '1.5rem' }}>Support NKK events</h3>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/membership" className="btn btn-gold">Become a member</Link>
              <Link to="/donate" className="btn btn-outline">Donate</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
