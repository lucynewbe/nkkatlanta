import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { StatCounter } from '../components/StatCounter';
import { useScrollReveal } from '../hooks/useApi';
import Seo from '../components/Seo.jsx';
import { eventTimeRange } from '../utils/format.js';

const FALLBACK_SLIDES = [
  { src: '/assets/hero-bg.png', label: 'Namma', subtitle: 'The Magnificent Karnataka' },
  { src: '/assets/hampi.png', label: 'Hampi', subtitle: 'The Magnificent Ruins of Vijayanagara Empire' },
  { src: '/assets/mysore.png', label: 'Mysore', subtitle: 'The City of Palaces — ಮೈಸೂರು' },
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

function HeroCarousel({ nextEvent, slides }) {
  const list = slides.length ? slides : FALLBACK_SLIDES;
  const [idx, setIdx] = useState(0);
  const timerRef = useRef(null);
  const total = list.length;

  const goTo = useCallback((n) => {
    setIdx(((n % total) + total) % total);
  }, [total]);

  useEffect(() => {
    timerRef.current = setInterval(() => setIdx(i => (i + 1) % total), 5500);
    return () => clearInterval(timerRef.current);
  }, [total]);

  const pause = () => clearInterval(timerRef.current);
  const resume = () => { timerRef.current = setInterval(() => setIdx(i => (i + 1) % total), 5500); };
  const time = eventTimeRange(nextEvent);

  return (
    <div className="hero-silk" onMouseEnter={pause} onMouseLeave={resume}>
      {list.map((slide, i) => (
        <div key={slide.src + i} className={`hero-silk-slide${i === idx ? ' is-active' : ''}`}>
          <div className="hero-silk-slide-bg" style={{ backgroundImage: `url('${slide.src}')` }} />
        </div>
      ))}
      <div className="hero-silk-veil" />
      <div className="hero-silk-content">
        <p className="hero-kannada-xl">ನೃಪತುಂಗ ಕನ್ನಡ ಕೂಟ</p>
        <h1 className="hero-english">NKK ATLANTA</h1>
        <hr className="silk-rule" />
        <p className="hero-lead">
          Keeping the fragrance of Kannada alive in Atlanta since 1973.
          <br />
          <em key={list[idx]?.subtitle} className="hero-caption">{list[idx]?.subtitle}</em>
        </p>

        {nextEvent && (
          <div className="ticket-card">
            <div className="ticket-kicker">Upcoming celebration</div>
            <div className="ticket-title">{nextEvent.title}</div>
            {nextEvent.title_kn && (
              <div className="kn" style={{ fontFamily: 'var(--font-kannada)', marginBottom: '0.5rem', color: 'var(--color-primary-2)' }}>{nextEvent.title_kn}</div>
            )}
            <div className="ticket-meta">
              {nextEvent.date && <span>{nextEvent.date}</span>}
              {time && <span>{time}</span>}
            </div>
            {nextEvent.location && <div className="ticket-loc">{nextEvent.location}</div>}
            {nextEvent.register_url ? (
              <a href={nextEvent.register_url} target="_blank" rel="noopener noreferrer" className="btn btn-gold">Register</a>
            ) : (
              <Link to="/events" className="btn btn-outline">Event details</Link>
            )}
          </div>
        )}

        <div className="hero-actions">
          <Link to="/donate" className="btn btn-primary">Support NKK</Link>
          <Link to="/membership" className="btn btn-outline">Become a member</Link>
        </div>
      </div>
      <div className="hero-dots">
        {list.map((_, i) => (
          <button key={i} type="button" className={`hero-dot${i === idx ? ' is-active' : ''}`} onClick={() => goTo(i)} aria-label={`Slide ${i + 1}`} />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [events, setEvents] = useState([]);
  const [slides, setSlides] = useState([]);

  useScrollReveal([events.length]);

  useEffect(() => {
    fetch('/api/events').then(r => r.json()).then(setEvents).catch(() => {});
    fetch('/api/slides').then(r => r.json()).then(setSlides).catch(() => {});
    window.scrollTo(0, 0);
  }, []);

  const nextEvent = events?.find(e => e.is_upcoming) || events?.[0];

  return (
    <>
      <Seo title="Home" description="Nrupathunga Kannada Koota — Greater Atlanta Kannada community since 1973. Events, membership, and seva." />
      <HeroCarousel nextEvent={nextEvent} slides={slides} />

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
              { title: 'Cultural Excellence', desc: 'Ugadi, Rajyotsava, and Sankranti — Karnataka’s festivals, hosted with care in Atlanta.' },
              { title: 'Community Service', desc: 'Scholarships, charity drives, and volunteer seva across Greater Atlanta and Karnataka.' },
              { title: 'Heritage Preservation', desc: 'Language, literature, and art — Kannada kept alive for the next generation.' },
            ].map((c, i) => (
              <div className={`glass-card mission-card reveal${i ? ` reveal-delay-${i}` : ''}`} key={c.title}>
                <div className="mission-title">{c.title}</div>
                <p className="mission-desc">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-header reveal">
            <div className="section-tag">This season</div>
            <h2 className="section-title">Festival <span className="accent">calendar</span></h2>
          </div>
          <div className="event-grid">
            {events.map((e, idx) => (
              <div key={e.id} className={`glass-card event-mini reveal ${idx % 2 ? 'reveal-delay-1' : ''}`}>
                <div className="ticket-kicker">{e.date || e.month}</div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.45rem', marginBottom: '0.35rem' }}>{e.title}</h3>
                {e.title_kn && <div style={{ fontFamily: 'var(--font-kannada)', color: 'var(--color-primary-2)', marginBottom: '0.75rem' }}>{e.title_kn}</div>}
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', flex: 1 }}>{e.description}</p>
                <Link to="/events" className="btn btn-outline btn-sm" style={{ marginTop: '1.25rem', alignSelf: 'flex-start' }}>Learn more</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

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
