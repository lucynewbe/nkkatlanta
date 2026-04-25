import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { StatCounter } from '../components/StatCounter';
import { useScrollReveal } from '../hooks/useApi';

// Carousel slides using LOCAL assets
const SLIDES = [
  { src: '/assets/hero-bg.png', label: 'Namma', subtitle: 'The Magnificent Karnatka' },
  { src: '/assets/hampi.png', label: 'Hampi', subtitle: 'The Magnificent Ruins of Vijayanagara Empire' },
  { src: '/assets/mysore.png', label: 'Mysore', subtitle: 'The City of Palaces — ಮೈಸೂರು' },
  { src: '/assets/jog.png', label: 'Jog Falls', subtitle: 'Karnataka\'s Majestic Waterfall Wonder' },
  { src: '/assets/coorg.png', label: 'Coorg', subtitle: 'Scotland of India — ಕೊಡಗು' },
  { src: '/assets/badami.png', label: 'Badami', subtitle: 'Ancient Cave Temples of the Chalukyas' },
];

const CHARITIES = [
  'Shree Durgaparameshwari Temple, Lodd, Karnataka',
  'Muteri Foundation Scholarship Fund',
  'Giving Children Hope',
  'Relief for flood victims in Karnataka',
  'Help for fire victims in Cherokee County, GA',
  'Sewa International — COVID-19 relief',
  'New American Pathways, Atlanta',
  'Donate Life Georgia',
];

function HeroCarousel({ nextEvent }) {
  const [idx, setIdx] = useState(0);
  const timerRef = useRef(null);
  const total = SLIDES.length;

  const goTo = useCallback((n) => {
    setIdx(((n % total) + total) % total);
  }, [total]);

  useEffect(() => {
    timerRef.current = setInterval(() => setIdx(i => (i + 1) % total), 5000);
    return () => clearInterval(timerRef.current);
  }, [total]);

  const pause = () => clearInterval(timerRef.current);
  const resume = () => { timerRef.current = setInterval(() => setIdx(i => (i + 1) % total), 5000); };

  return (
    <div
      id="hero-carousel"
      style={{ position: 'relative', width: '100%', minHeight: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      {SLIDES.map((slide, i) => (
        <div key={slide.src} style={{ position: 'absolute', inset: 0, opacity: i === idx ? 1 : 0, transition: 'opacity 1.2s ease', zIndex: 0 }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: `url('${slide.src}')`, backgroundSize: 'cover', backgroundPosition: 'center', transform: 'scale(1.06)', animation: 'subtleZoom 20s ease-in-out infinite alternate' }} />
        </div>
      ))}

      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg,rgba(10,6,18,0.78) 0%,rgba(10,6,18,0.4) 40%,rgba(10,6,18,0.82) 100%)', zIndex: 1 }} />

      <div style={{ position: 'relative', zIndex: 2, padding: '2rem', paddingTop: 'calc(var(--nav-height) + 2rem)', maxWidth: '850px' }}>
        <h1 style={{ fontFamily: 'var(--font-kannada)', fontSize: 'clamp(2.2rem,6vw,4.5rem)', marginBottom: '0.5rem', color: 'var(--color-primary-2)', textShadow: '0 0 40px rgba(230,160,32,0.5)', animation: 'fadeInUp 0.8s ease 0.2s both' }}>
          ನೃಪತುಂಗ ಕನ್ನಡ ಕೂಟ
        </h1>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem,4vw,3.5rem)', marginBottom: '1.2rem', animation: 'fadeInUp 0.8s ease 0.4s both' }}>
          NKK ATLANTA
        </h2>
        <p style={{ maxWidth: '100%', marginBottom: '2.5rem', fontSize: '1.2rem', lineHeight: 1.8, fontWeight: 500, color: 'rgba(240,234,248,0.9)', animation: 'fadeInUp 0.8s ease 0.55s both' }}>
          Keeping the fragrance of Kannada alive in Atlanta since 1973.<br />
          <em style={{ fontSize: '1rem', opacity: 0.75, fontWeight: 400 }}>{SLIDES[idx].subtitle}</em>
        </p>

        {/* DYNAMIC Upcoming Events box */}
        {nextEvent && (
          <div style={{ background: 'rgba(0,0,0,0.45)', border: '1px solid rgba(255,255,255,0.18)', padding: '1.75rem', borderRadius: '16px', marginBottom: '2.5rem', boxShadow: '0 15px 45px rgba(0,0,0,0.4)', backdropFilter: 'blur(12px)', animation: 'fadeInUp 0.8s ease 0.7s both', textAlign: 'center' }}>
            <h3 style={{ color: 'var(--color-primary-2)', fontSize: '1.1rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem', fontWeight: 700 }}>Upcoming Event</h3>
            <div style={{ fontWeight: 800, fontSize: '1.8rem', marginBottom: '0.5rem', color: '#fff', lineHeight: 1.2 }}>{nextEvent.title}</div>
            
            {(nextEvent.date || nextEvent.time_start) && (
              <div style={{ fontSize: '1.1rem', color: 'var(--color-primary-2)', fontWeight: 600, marginBottom: '0.5rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem' }}>
                {nextEvent.date && <span>📅 {nextEvent.date}</span>}
                {nextEvent.time_start && (
                  <span>
                    ⏰ {new Date(`1970-01-01T${nextEvent.time_start}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                    {nextEvent.time_end && ` - ${new Date(`1970-01-01T${nextEvent.time_end}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`}
                  </span>
                )}
              </div>
            )}

            {nextEvent.location && <div style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.8)', marginBottom: '1.25rem' }}>📍 {nextEvent.location}</div>}
            
            {nextEvent.register_url ? (
               <a href={nextEvent.register_url} target="_blank" rel="noopener noreferrer" className="btn btn-gold" style={{ display: 'inline-flex', padding: '0.8rem 2rem' }}>
                 ✨ Click here to Register
               </a>
            ) : (
               <Link to="/events" className="btn btn-outline" style={{ display: 'inline-flex' }}>View Event Details</Link>
            )}
          </div>
        )}

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', animation: 'fadeInUp 0.8s ease 0.85s both' }}>
          <a href="https://www.zeffy.com/en-US/ticketing/nkk-annual-donations--2026" target="_blank" rel="noopener noreferrer" className="btn btn-primary">Support NKK — Donate</a>
          <Link to="/membership" className="btn btn-outline">Membership 2026</Link>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', zIndex: 3, display: 'flex', gap: '0.6rem' }}>
        {SLIDES.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)} style={{ width: i === idx ? 24 : 8, height: 8, borderRadius: '100px', background: i === idx ? 'var(--color-primary-2)' : 'rgba(255,255,255,0.4)', border: 'none', cursor: 'pointer', transition: 'all 0.3s', padding: 0 }} />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [events, setEvents] = useState([]);
  
  useScrollReveal([events.length]);

  useEffect(() => {
    fetch('/api/events').then(r => r.json()).then(data => setEvents(data)).catch(() => { });
    window.scrollTo(0, 0);
  }, []);

  const nextEvent = events?.find(e => e.is_upcoming) || events?.[0]; // Pick the marked upcoming or first active event

  return (
    <>
      <HeroCarousel nextEvent={nextEvent} />

      {/* STATS */}
      <div className="stats-section">
        <div className="stats-grid">
          {[
            { target: 53, suffix: '', label: 'Years of Legacy' },
            { target: 1200, suffix: '+', label: 'Kannada Families' },
            { target: 3, suffix: '', label: 'Major Annual Events' },
            { target: 50, suffix: '+', label: 'Scholarships Awarded' },
          ].map(s => (
            <div className="stat-item reveal" key={s.label}>
              <div className="stat-number"><StatCounter target={s.target} suffix={s.suffix} /></div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <section>
        <div className="container">
          <div className="section-header reveal">
            <div className="section-tag">Our Purpose</div>
            <h2 className="section-title">Why <span className="accent">NKK?</span></h2>
          </div>
          <div className="grid-3">
            {[
              { icon: '🎭', title: 'Cultural Excellence', desc: 'Annual Ugadi, Rajyotsava, and Sankranthi celebrations that bring the color and joy of Karnataka festivals to Atlanta.' },
              { icon: '🤝', title: 'Community Service', desc: 'From scholarships for students to charity drives and volunteer engagement — NKK serves the Greater Atlanta community.' },
              { icon: '📚', title: 'Heritage Preservation', desc: 'Language, literature, and art — preserving the essence of Karnataka for the next generation.' },
            ].map((c, i) => (
              <div className={`glass-card mission-card reveal${i ? ` reveal-delay-${i}` : ''}`} key={c.title}>
                <span className="mission-icon">{c.icon}</span>
                <div className="mission-title">{c.title}</div>
                <p className="mission-desc">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DYNAMIC EVENTS LIST */}
      <section style={{ background: 'rgba(124,58,237,0.03)', padding: '5rem 2rem' }}>
        <div className="container">
          <div className="section-header reveal">
            <div className="section-tag">Events</div>
            <h2 className="section-title">2026 <span className="accent">Calendar</span></h2>
          </div>
          <div className="grid-2">
             {events.map((e, idx) => (
               <div key={e.id} className={`glass-card reveal ${idx % 2 ? 'reveal-delay-1' : ''}`} style={{ padding: '2rem' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{e.emoji}</div>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{e.title}</h3>
                  <div style={{ color: 'var(--color-primary-2)', fontWeight: 600, marginBottom: '1rem' }}>{e.date || e.month}</div>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>{e.description}</p>
                  <Link to="/events" className="btn btn-outline btn-sm">Learn More</Link>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* CHARITY */}
      <section>
        <div className="container">
          <div className="section-header reveal">
            <div className="section-tag">Giving Back</div>
            <h2 className="section-title">Community <span className="accent">Seva</span></h2>
          </div>
          <div className="charity-grid reveal">
            {CHARITIES.map(c => (
              <div className="charity-item" key={c}>
                <div className="charity-dot" />
                <span className="charity-name">{c}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
