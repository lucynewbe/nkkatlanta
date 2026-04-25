import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useApi';

const CHARITIES = [
  ['1979', 'Yogananda Gokarna Scholarship Fund, Bombay'],
  ['2001', '9/11 Donations'],
  ['2003', 'HTA Improvement Fund'],
  ['2004', 'Samarthanam Trust (Blind School), Bangalore'],
  ['2005', 'Tsunami Donations — Chinmaya Mission'],
  ['2006', 'HTA Devi\'s Fund'],
  ['N/A', 'Nashville Temple Priest Fund, Nashville TN'],
  ['N/A', 'Gante Sheshadri Fund, Washington DC'],
  ['2007', 'Swami Nirbhayananda, Bidar'],
  ['2007', 'Gandhi Foundation'],
  ['2008', 'Nrupathunga Kannada School, Mysore'],
  ['2010', 'Ramakrishna Mission, Belgaum ($3,000)'],
  ['2010', 'Vibha Walk'],
  ['2011', 'American Cancer Society'],
  ['2012', 'Raksha (Georgia Nonprofit, South Asian Community)'],
  ['2012', 'Vibha (Georgia Nonprofit Volunteering)'],
  ['2010+', 'Douglas Road — Adopt-a-Mile & Road Cleaning'],
];

const TIMELINE = [
  { year: '1973', text: 'Dr. H.N. Ramaswamy founds NKK on Ugadi day — the same day that inspires our annual Ugadi celebration.' },
  { year: '1979', text: 'First charity donation to Yogananda Gokarna Scholarship Fund, beginning NKK\'s tradition of giving.' },
  { year: '2001', text: 'NKK mobilizes community support and donations in response to the September 11 tragedy.' },
  { year: '2005', text: 'Donations to Chinmaya Mission for victims of the devastating Indian Ocean Tsunami.' },
  { year: '2010', text: 'Adopt-a-Mile on Douglas Road begins. Support for Ramakrishna Mission flood victims in Belgaum.' },
  { year: '2018', text: 'NKK celebrates its 45th anniversary, having grown to 1200+ Kannadiga families across Greater Atlanta.' },
  { year: '2026', text: 'NKK continues — stronger than ever, serving, celebrating, and connecting Kannadigas in Atlanta.' },
];

// NKK Leadership history table (from scraped English data)
const LEADERSHIP = [
  { years: '1973–1975', president: 'Dr. H. N. Ramaswamy', secretary: '' },
  { years: '1975–1977', president: 'S. N. Ramaswamy', secretary: '' },
  { years: '1977–1979', president: 'Dr. T. R. Anantharamu', secretary: '' },
  { years: '1979–1981', president: 'P. R. Krishnamurthy', secretary: '' },
  { years: '1981–1983', president: 'Dr. S. Krishnaswamy', secretary: '' },
  { years: '1983–1985', president: 'N. S. Nagaraj', secretary: '' },
  { years: '1985–1987', president: 'Dr. M. V. Ramamurthy', secretary: '' },
  { years: '1987–1989', president: 'M. K. Venugopal', secretary: '' },
  { years: '1989–1991', president: 'M. S. Ramamurthy', secretary: '' },
  { years: '1991–1993', president: 'H. S. Lakshminarayana', secretary: '' },
  { years: '1993–1995', president: 'K. S. Murthy', secretary: '' },
  { years: '1995–1997', president: 'K. C. Narasimhamurthy', secretary: '' },
  { years: '1997–1999', president: 'S. N. Dharmadhikari', secretary: '' },
  { years: '1999–2001', president: 'B. V. Basavaraj', secretary: '' },
  { years: '2001–2003', president: 'H. K. Krishnaiah', secretary: '' },
  { years: '2003–2005', president: 'K. R. Prasad', secretary: '' },
  { years: '2005–2007', president: 'N. Krishnamurthy', secretary: '' },
  { years: '2007–2009', president: 'Pradeep Gowdru', secretary: '' },
  { years: '2009–2011', president: 'Ashok Sundar', secretary: '' },
  { years: '2011–2013', president: 'Ravi Krishnaswamy', secretary: '' },
  { years: '2013–2015', president: 'Raghavendra Hunasikatti', secretary: '' },
  { years: '2015–2017', president: 'Sharath Hanumantharao', secretary: '' },
  { years: '2017–2019', president: 'Rajesh Chandrashekhar', secretary: '' },
  { years: '2019–2021', president: 'Dr. Subra Bhat', secretary: '' },
  { years: '2021–2023', president: 'Prashanth Rao', secretary: '' },
  { years: '2023–2025', president: 'Vijay Kumar', secretary: '' },
  { years: '2025–2026', president: 'NKK President 2026', secretary: '' },
];

export default function About() {
  useScrollReveal();
  const location = useLocation();

  useEffect(() => {
    // Scroll to hash anchor after page loads or location changes
    const hash = location.hash;
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash.replace('#', ''));
        if (el) {
           if (window.lenis) window.lenis.scrollTo(el, { offset: -80 });
           else el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 200);
    } else {
      if (window.lenis) window.lenis.scrollTo(0);
      else window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  return (
    <>
      <header className="page-header">
        <div className="page-tag">Our Story</div>
        <h1 className="page-title">About <span className="gradient-text">NKK Atlanta</span></h1>
        <p className="page-subtitle">Five decades of celebrating Karnataka's culture, building community, and serving humanity in the heart of Georgia.</p>

        {/* Quick-link buttons — matching the original about.html */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', marginTop: '2.5rem', marginBottom: '2rem' }}>
          <Link to="/team" className="btn btn-primary" style={{ padding: '0.8rem 1.5rem', borderRadius: '30px' }}>👥 NKK Team 2026</Link>
          <Link to="/gallery" className="btn btn-outline" style={{ padding: '0.8rem 1.5rem', borderRadius: '30px' }}>📸 Gallery</Link>
          <a href="#bylaws" onClick={e => { e.preventDefault(); document.getElementById('bylaws')?.scrollIntoView({ behavior: 'smooth' }); }} className="btn btn-outline" style={{ padding: '0.8rem 1.5rem', borderRadius: '30px' }}>⚖️ Bylaws</a>
          <a href="#journey" onClick={e => { e.preventDefault(); document.getElementById('journey')?.scrollIntoView({ behavior: 'smooth' }); }} className="btn btn-outline" style={{ padding: '0.8rem 1.5rem', borderRadius: '30px' }}>🛤️ Our Journey</a>
          <a href="#kannada-journey" onClick={e => { e.preventDefault(); document.getElementById('kannada-journey')?.scrollIntoView({ behavior: 'smooth' }); }} className="btn btn-outline" style={{ padding: '0.8rem 1.5rem', borderRadius: '30px' }}>ಕನ್ನಡದ ಪಯಣ</a>
          <a href="https://www.atlantakannada.org/_files/ugd/91e833_6dafab83c43b455188182048da760d42.docx?dn=20251001-nkk-liability-waiverand%20release.docx" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ padding: '0.8rem 1.5rem', borderRadius: '30px' }}>📝 Liability Waiver</a>
        </div>

        <div className="divider" />
      </header>

      {/* MISSION */}
      <section>
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center', gap: '4rem' }}>
            <div className="reveal">
              <div className="section-tag">Who We Are</div>
              <h2 className="section-title" style={{ textAlign: 'left' }}>A <span className="accent">Home Away</span><br />from Home</h2>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.25rem', lineHeight: 1.8 }}>
                Nrupathunga Kannada Koota (NKK) is a non-profit organization, registered under sec. 501(c)(3), in the state of Georgia. We nourish the feeling of 'home away from home' for thousands of compatriots who have resided in the greater Atlanta region for many decades.
              </p>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem', lineHeight: 1.8 }}>
                Our mission is to preserve and promote the Kannada language and culture, by homogeneously working in the Atlanta region through the Kannada-speaking population — known as <em>Kannadigas</em> — of the USA.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                <span className="hero-badge">🏛️ Founded 1973 — Ugadi Day</span>
                <span className="hero-badge">✅ IRS 501(c)(3)</span>
                <span className="hero-badge">👨‍👩‍👧‍👦 1200+ Families</span>
              </div>
            </div>
            <div className="reveal reveal-delay-2">
              <div className="glass-card" style={{ padding: '2.5rem' }}>
                <div style={{ fontFamily: 'var(--font-kannada)', fontSize: '1.1rem', color: 'var(--color-primary-2)', marginBottom: '1.5rem', textAlign: 'center' }}>ಕರ್ನಾಟಕ · ಕನ್ನಡ · ಕನ್ನಡಿಗ</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  {[
                    { icon: '🎭', label: 'Major Events', val: '4+', color: 'rgba(200,132,26,0.06)' },
                    { icon: '📋', label: 'Board Members', val: '8', color: 'rgba(124,58,237,0.06)' },
                    { icon: '⚙️', label: 'Exec Committee', val: '8', color: 'rgba(124,58,237,0.06)' },
                    { icon: '❤️', label: 'Charities', val: '15+', color: 'rgba(200,132,26,0.06)' },
                  ].map(s => (
                    <div key={s.label} style={{ padding: '1.25rem', background: s.color, borderRadius: '12px', textAlign: 'center' }}>
                      <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{s.icon}</div>
                      <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-primary-2)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.label}</div>
                      <div style={{ fontSize: '1.5rem', fontFamily: 'var(--font-heading)', fontWeight: 700 }}>{s.val}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* JOURNEY */}
      <section id="journey" style={{ background: 'linear-gradient(180deg,rgba(124,58,237,0.04),transparent)' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-tag">Our Journey</div>
            <h2 className="section-title">From <span className="accent">1973</span> to Today</h2>
            <p className="section-desc">It began on Ugadi day in 1973, sparked by Dr. H.N. Ramaswamy — today NKK serves thousands of Kannada families across Atlanta.</p>
          </div>
          <div className="grid-2" style={{ gap: '4rem', alignItems: 'start' }}>
            <div>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.9, marginBottom: '1.5rem' }}>
                Until about 45 years ago, Atlanta did not have a significant Kannada presence. Globalization and immigration exchanges paved the way for many Kannadigas to arrive in Atlanta on work, business, and professional education programs. Today, Kannadigas are prominent achievers and contributors to American society in science, arts, administration, and education.
              </p>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.9, marginBottom: '1.5rem' }}>
                It was in 1973 that Dr. H.N. Ramaswamy, encouraged by fellow Kannadigas in Michigan, established a Kannada community in Atlanta. On the auspicious day of Ugadi, Nrupathunga Kannada Koota was formally founded. Initially confined to celebrating Indian festivals, NKK grew into a well-organized and focused community.
              </p>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.9 }}>
                Today, NKK is an organization within the reach of 1200+ Kannadiga families in the greater Atlanta region. NKK has grown beyond a cultural organization and is active in social and community development programs.
              </p>
            </div>
            <div className="timeline">
              {TIMELINE.map(t => (
                <div className="timeline-item" key={t.year}>
                  <div className="timeline-dot" />
                  <div className="timeline-year">{t.year}</div>
                  <div className="timeline-content">{t.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LEADERSHIP TABLE */}
      <section>
        <div className="container">
          <div className="section-header">
            <div className="section-tag">Leadership History</div>
            <h2 className="section-title">Presidents Since <span className="accent">Inception</span></h2>
            <p className="section-desc">A complete record of every President who has led NKK from 1973 through today.</p>
          </div>
          <div className="journey-table-wrap reveal">
            <table className="journey-table">
              <thead>
                <tr>
                  <th>Period</th>
                  <th>President / Chairman</th>
                </tr>
              </thead>
              <tbody>
                {LEADERSHIP.map(row => (
                  <tr key={row.years}>
                    <td style={{ color: 'var(--color-primary-2)', fontWeight: 600, whiteSpace: 'nowrap' }}>{row.years}</td>
                    <td>{row.president}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.82rem', marginTop: '1rem', textAlign: 'center' }}>
            Also available in Kannada — <a href="#kannada-journey" rel="noopener noreferrer" style={{ color: 'var(--color-primary-2)' }}>ನಮ್ಮ ಪ್ರಯಾಣ (ಕನ್ನಡದಲ್ಲಿ) →</a>
          </p>
        </div>
      </section>

      {/* CHARITY */}
      <section style={{ background: 'linear-gradient(180deg,rgba(124,58,237,0.04),transparent)' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-tag">Community Service</div>
            <h2 className="section-title">Every Cause We've <span className="accent">Championed</span></h2>
          </div>
          <div className="charity-grid reveal">
            {CHARITIES.map(([year, name]) => (
              <div className="charity-item" key={name}>
                <div className="charity-dot" />
                <span className="charity-name">{name}{year !== 'N/A' && year !== '2010+' ? ` — ${year}` : year === '2010+' ? ' — since 2010' : ''}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GOVERNANCE */}
      <section id="bylaws">
        <div className="container">
          <div className="section-header">
            <div className="section-tag">Governance</div>
            <h2 className="section-title">How We're <span className="accent">Structured</span></h2>
          </div>
          <div className="grid-3">
            {[
              { icon: '🏛️', title: 'Board of Directors', desc: '8 dedicated trustees govern the organization and provide strategic direction.' },
              { icon: '⚙️', title: 'Executive Committee', desc: '8 executive members manage day-to-day operations and annual events.' },
              { icon: '👥', title: 'General Body', desc: 'Paid members who form the foundation of NKK. Regulated by bylaws.' },
            ].map((g, i) => (
              <div className={`glass-card reveal${i > 0 ? ` reveal-delay-${i}` : ''}`} key={g.title} style={{ padding: '2.5rem', textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{g.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', color: 'var(--color-primary-2)', marginBottom: '0.75rem' }}>{g.title}</h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>{g.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link to="/team" className="btn btn-outline">Meet the 2026 Team →</Link>
          </div>
        </div>
      </section>

      {/* BYLAWS SECTION — inline, no external link */}
      <section id="bylaws" style={{ background: 'linear-gradient(135deg,rgba(200,132,26,0.04),rgba(124,58,237,0.04))' }}>
        <div className="container" style={{ maxWidth: '860px' }}>
          <div className="section-header">
            <div className="section-tag">Governance</div>
            <h2 className="section-title">NKK <span className="accent">Bylaws</span></h2>
            <p className="section-desc">Constitution &amp; Bylaws of Nrupathunga Kannada Koota of Atlanta (NKK), Georgia — effective October 1, 2021.</p>
          </div>
          <div className="reveal" style={{ background: 'linear-gradient(135deg,rgba(200,132,26,0.08),rgba(124,58,237,0.06))', border: '1px solid rgba(200,132,26,0.25)', borderRadius: '24px', padding: '3rem', textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1.25rem' }}>📜</div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '1rem' }}>ByLaws — Updated Amendments</h3>
            <p style={{ color: 'var(--color-text-muted)', maxWidth: '580px', margin: '0 auto 2rem', lineHeight: 1.8 }}>
              The NKK Bylaws govern the organization's structure, membership, elections, and operations. Last updated: <strong style={{ color: 'var(--color-primary-2)' }}>October 1, 2021.</strong> The full official document is available at the NKK website.
            </p>
            <a href="/assets/LawPdf.pdf" download className="btn btn-primary">📋 Download Bylaws PDF →</a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: '1.5rem' }} className="reveal">
            {[
              { icon: '🏛', title: 'Organization Name', desc: 'Nrupathunga Kannada Koota of Atlanta (NKK), Georgia — a non-profit organization registered under IRS Section 501(c)(3).' },
              { icon: '👥', title: 'Governance Structure', desc: '8-member Board of Trustees, 8-member Executive Committee, and a general body of paid members. Elections held as per bylaws.' },
              { icon: '📅', title: 'Last Updated', desc: 'The Constitution and Bylaws were last amended effective October 1, 2021, per the NKK General Body resolution.' },
            ].map(b => (
              <div key={b.title} className="glass-card" style={{ padding: '2rem' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{b.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', color: 'var(--color-primary-2)', marginBottom: '0.5rem' }}>{b.title}</h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KANNADA JOURNEY SECTION — inline, no external link */}
      <section id="kannada-journey" style={{ background: 'linear-gradient(180deg,rgba(124,58,237,0.04),transparent)' }}>
        <div className="container" style={{ maxWidth: '860px' }}>
          <div className="section-header reveal">
            <div className="section-tag" style={{ fontFamily: 'var(--font-kannada)' }}>ನಮ್ಮ ಇತಿಹಾಸ</div>
            <h2 className="section-title">ನಾವು ನಡೆದು ಬಂದ <span className="accent">ದಾರಿ</span></h2>
            <p className="section-desc">NKK's journey in Kannada — ನೃಪತುಂಗ ಕನ್ನಡ ಕೂಟದ ಇತಿಹಾಸ</p>
          </div>
          <div className="kn-article reveal">
            <p>ಸಾವಿರದ ಒಂಬಯ ನೂರು ಎಪ್ಪತ್ತರದಲ್ಲಿಆಟ್ಲಾಂಟ ನಗರದಲ್ಲಿ ವಲಸೆ ಬಂದ ಕನ್ನಡಿಗರು ಅತಿ ವಿರಳ. ಸುಮಾರು ಹತ್ತು ಸಂಸಾರಸ್ಥರು ಮತ್ತು
              ಹೆಚ್ಚಿನ ಸಂಗತಿಯಲ್ಲಿ ವಿಶ್ವವಿಧ್ಯಾನಿಲಯದ ವಿಧ್ಯಾರ್ಥಿಗಳು ಇದ್ದರು. ಯಾವ ಭಾರತೀಯ ಸಂಘಗಳು ಇರಲಿಲ್ಲ.</p>
            <p>ಮಿಚಿಗನ್ ಪ್ರಾಂತ್ಯದ ಹಲವು ಕನ್ನಡಿಗರು ಉತ್ಸಾಹದಿಂದ, ಈ ಬರಿದಾಗಿರುವ ಸಂಗತಿಯನ್ನು ಪರಿಹರಿಸಲು ಮುಂದಾದರು. ಅವರು
              ಜಾರ್ಜಿಯ ಟೆಕ್ ನಲ್ಲಿ ವಿಧ್ಯಾರ್ಥಿಗಳ ಸಂಪರ್ಕಿಸಿ ಅವರ ಅಳಲನ್ನು ವ್ಯಕ್ತಪಡಿಸಿದರು. ಆದರೆ ಆ ವಿಧ್ಯಾರ್ಥಿಗಳಿಗೆ ಕಾಲಾವಕಾಶ ಇರಲಿಲ್ಲ. ಆಗ
              ಡಾ. ರಾಮಸ್ವಾಮಿಯವರನ್ನು ಅವರು ಸಂಪರ್ಕಿಸಿ ವಿಷಯನ್ನು ತಿಳಿಸಿದರು. ರಾಮಸ್ವಾಮಿಯವರ ಮನೆಯಲ್ಲಿ ೧೯೭೩ ರ ಯುಗಾದಿ ಹಬ್ಬದ
              ದಿನ ಕೆಲವೇ ಸಂಸಾರಸ್ಥರು ಮತ್ತು ವಿಧ್ಯಾರ್ಥಿಗಳು ಸೇರಿ &quot;ಪಂಪ&quot; ಕನ್ನಡ ಕೂಟದವರ ಆಸೆಯಂತೆ &quot;ನೃಪತುಂಗ ಕನ್ನಡ ಕೂಟ&quot; ವನ್ನು ಅಸ್ಥಿತ್ವಕ್ಕೆ ತಂದರು.</p>
            <p>ಕನ್ನಡ ನುಡಿಯನ್ನ ಮಾತನಾಡುವ ಜನರನ್ನು ಒಂದುಗೂಡಿಸುವುದು, ಮನೋರಂಜನೆ ಕಾರ್ಯಕ್ರರ್ಮಗಳನ್ನು ಏರ್ಪಡಿಸುವುದು,ಸತ್ಸಂಗ ಮತ್ತು
              ಸುಖ ಭೋಜನವನ್ನು ಒದಗಿಸುವ ಸದುದ್ದೇಶವನ್ನು ಬಿಟ್ಟರೆ ಇನ್ಯಾವ ಉದಾತ್ತ ಧ್ಯೇಯಗಳಾಗಲಿ, ಮಹತ್ತರ ಗುರಿಗಳಾಗಲಿ ಅಂದು ನೆರೆದಿದ್ದ
              ಸದಸ್ಯರ ಮನಸ್ಸಿನಲ್ಲಿರಲಿಲ್ಲ.</p>
            <p>೧೯೭೯ ರಲ್ಲಿ ಶ್ರೀಮತಿ. ಮಾರ್ಥ್ ಆಷ್ಟನ್ನರು ಕರ್ನಾಟಕದಿಂದ ಕರೆತಂದಿಂದ 'ಯಕ್ಷಗಾನ' ವನ್ನು ಅಟ್ಲಾಂಟ ಕಲಾ ಕೇಂದ್ರದಲ್ಲಿ ಏರ್ಪಡಿಸಿತ್ತು. ಸುಮಾರು ೨೦೦ ಅಭಿಮಾನಿಗಳು ಆಗಮಿಸಿದರು.ಕೇವಲ ೫ ಡಾಲರ್ ವಾರ್ಷಿಕ ಚಂದವನ್ನು ನಿಗದಿ ಮಾಡಿತ್ತು. ಹಣಕಾಸಿನ ತೊಂದರೆ,ಸ್ಥಳದ ಅಭಾವದಿಂದ ಅವರ ಇವರ ಮನೆಯಲ್ಲಿ
              ಯುಗಾದಿ, ರಾಮನವಮಿ, ಸಂಕ್ರಾಂತಿ, ರಾಜ್ಯೋತ್ಸವ ಸಂಧರ್ಭಗಳಲ್ಲಿ ಮನೋರಂಜನೆ ಕಾರ್ಯಕ್ರಮಗಳನ್ನು ಏರ್ಪಡಿಸುವುದು ಮತ್ತು
              ಪ್ರಾಂತ್ಯದ ಉದ್ಯಾನವಗಳಲ್ಲಿ ತಣಿದು, ಅಲ್ಲಿಯೆ ಅಡಿಗೆ ತಯಾರಿಸಿ ಆಟ ಗಳನ್ನು ಏರ್ಪಡಿಸುತ್ತಿದ್ದೆವು.
              ಸ್ಥಳೀಯ ಬರಹಗಾರರಿಗೆ ಅವಕಾಶ ಕಲ್ಪಿಸುವ ಸಲುವಾಗಿ ೧೯೭೬ ರಲ್ಲಿ ವಿಧ್ಯಾರ್ಥಿಯಾಗಿದ್ದ ಶ್ರೀಯುತ.ಚಂದ್ರಶೇಕರ ಸಂಪಾದಕತ್ವದ
              ನೇತೃತ್ವದಲ್ಲಿ &quot;ಚಿಗುರು&quot; ಸಂಚಿಕೆಯನ್ನು ಕೈಬರದಲ್ಲಿ ಹೊರ ತರಲಾಯ್ತು.ಇಂದಿಗೂ &quot;ಚಿಗುರು&quot;ಲೇಖಕರ ಮತ್ತು ಓದುಗರ ಮೆಚ್ಚುಗೆಯನ್ನು ಸಂಪಾದಿಸಿದೆ.</p>
            <p>೨೫,೩೦,೩೫,೪೫ ನೇವಾರ್ಷಿಕೋತ್ಸವ ಸಂಚಿಕೆಗಳು ಮತ್ತು ವೈಭವಭರಿತವಾದ ೭ನೇಅಕ್ಕ ಸಮ್ಮೇಳನದ ಸ್ಮರಣೆ
              ಸಂಚಿಗಳನ್ನು &quot;ಚಿಗುರು&quot; ಹೆಸರಿನಲ್ಲೇ ಅನೇಕ ಹೆಸರಾಂತ ಕವಿಗಳ, ವಿಮರ್ಷಕರ, ಬರಹಗಾರರ ಲೇಖನಗನ್ನು ಕೂಡಿಸಿ ಪ್ರಟಿಸಿರುವುದು
              ವೈಶಿಷ್ಟ.</p>
            <p>ಸಣ್ಣದಾಗಿ ಬೆಳೆಯುತ್ತಿದ್ದ &quot;ನೃಪತುಂಗ ಕನ್ನಡ ಕೂಟ&quot; ದಕ್ಷಿಣ ಭಾತದ ಇತರ ಭಾಷೆಗಳ ಸಂಘಗಳು ಇಲ್ಲದಿದ್ದರಿಂದ ತಮಿಳು, ತೆಲುಗು ಮತ್ತು
              ಮಲೆಯಾಳದ ಭಾಷೆಯ ಭಾತೀಯರು ನಮ್ಮ ಕೂಟದ ಕಾರ್ಯಕ್ರರ್ಮಗಳಲ್ಲಿ ಭಾಗವಸುತ್ತಿದ್ದರು. ಕ್ರಮೇಣ ಕನ್ನಡಿಗರ ಸಂಖ್ಯೆಯೂ ಬೆಳೆಯಿತ್ತ
              ಬಂದಿತು, ಗ್ರುಹಸ್ಥರೂ ಹೆಚ್ಚು ಸಂಖ್ಯೆಯಲ್ಲಿ ಭಾಗವಹಿಸಲು ಪ್ರಾರಂಭಿಸಿದರು.</p>
            <p>ಆಕಸ್ಮಿಕವಾಗಿ ವಾಹನ ಅಪಘಾತದಲ್ಲಿ ಮರಣ ಹೊಂದಿದ ಶ್ರೀ.ಯೋಗನಂದ ಗೋಕರ್ಣ ರವರ (೧೯೭೮)ನೆನೆಪಿನಲ್ಲಿ ವಿಧ್ಯಾರ್ಥಿವೇತನವನ್ನು
              ಅವರು ಕಲಿತ ಬೊಂಬಾಯಿನಿ ಕನ್ನಡ ಪ್ರಾಥಮಿಕ ಶಾಲೆಯಲ್ಲಿ ಶ್ರೀಯುತ. ಮೋಹನ್ ದೇಶಪಾಂಡೆ, ಕೆ.ನರಸಿಂಹಮೂರ್ತಿ,ಡಾ. ಶಿವಪ್ಪ
              ಸ್ವಾಮಿಮತ್ತು ಹೊ.ನಾ. ರಾಮಮಸ್ವಾಮಿಯವರ ನೆರವಿನಿಂದ ತೆರೆಯಲಾಯ್ತು. ಇದೇ ಮೊದಲನೆಯ ಧರ್ಮಿಷ್ಟ ಕೆಲಸ. ಅನಂತರ ಹಲವಾರು
              ಧಾರ್ಮಿಕ ಮತ್ತು ಪರೋಪಿಕಾರಿ ಸಹಾಯವನ್ನು ನೀಡಿದೆ.(ನಮ್ಮ ವೆಬ್ ನಲ್ಲಿ ವಿವರಗಳು ಇದೆ)</p>
            <p>೧೯೭೯ರಲ್ಲಿ ಶ್ರೀಮತಿ. ಮಾರ್ಥ್ ಆಷ್ಟನ್ನರು ಕರ್ನಾಟಕದಿಂದ ಕರೆತಂದಿಂದ ’ಯಕ್ಷಗಾನ&quot; ವನ್ನು ಅಟ್ಲಾಂಟ ಕಲಾ ಕೇಂದ್ರದಲ್ಲಿ, ಅಟ್ಲಾಂಟ
              ಸಂಸ್ಕೃತಿ ಇಲಾಖೆಯ ನೆರವಿನಿಂದ ಏರ್ಪಡಿಸಿತ್ತು. ಸುಮಾರು ೨೦೦ ಅಭಿಮಾನಿಗಳು(ಅಂದಿನ ದಿನಕ್ಕೆ ಅದು ದೊಡ್ಡ ಸಂಖ್ಯೆ!). ನಾವು ಕಲಾ
              ಕ್ಷೇತ್ರದಲ್ಲಿ ಏರ್ಪಡಿಸಿದ್ದು ಅದೇ ಮೊಟ್ಟ ಮೊದಬಾರಿಗೆ!</p>
            <p></p>ಆ ಕಾರ್ಯಕ್ರಮ ನೋಡಿ ಆನಂದಿಸಿದವರೆಲ್ಲರೂ ನಮ್ಮ ಕನ್ನಡ ಕೂಟದ ಶ್ರಮವನ್ನು ಬಹಳವಾಗಿ ಪ್ರಶಂಸಿದರು. ಅಂದಿನಿಂದ ನಮ್ಮ ಕನ್ನಡ
            ಕೂಟ ಉತ್ತಮ ಕಾರ್ಯಕ್ರಮಗಳನ್ನು ಏರ್ಪಡಿಸುವುದಲ್ಲಿ ಯಶಸ್ವಿಯಾಯ್ತು. ಹೆಸರಾಂತ ಕಲಾವಿದರು ಕರ್ನಾಟಕದಿಂದ ಬಂದು ನಮ್ಮ
            ಉಪಚಾರವನ್ನು ಸ್ವೀಕರಿಸಿದರು. ಇಲ್ಲಿಯವೆರೆವಿಗೂ ಅನೇಕ ನಾಟಕಗಳೂ, ಸಂಗೀತ ಗೋಷ್ಟಿ, ಮಕ್ಕಳ ಮನೋರಂಜನೆ ಕಾರ್ಯಕ್ರಮಗಳನ್ನು
            ಏರ್ಪಡಿಸಿದೆ.
            <p style={{ color: 'var(--color-primary-2)', fontWeight: 600 }}>ಇಲ್ಲಿಯವರೆವಿಗೂ ನಮ್ಮ ಸಂಘಕ್ಕೆ ಭೇಟಿಕೊಟ್ಟ ಹಲವು ಕಲಾವಿದರು:</p>
            <div>
              <ul>
                <li>ಶ್ರೀಮತಿ. ಸುಮಸುಧೀಂದ್ರ(ವೀಣೆ)</li>
                <li>ಶ್ರೀ.ಶ್ಯಾಮಸುಂದರ್(ಮೃದಂಗ)(೧೯೮೨)</li>
                <li>ಶ್ರೀಮತಿ. ಎಮ್.ಎಸ್, ಶೀಲ(ಶಾತ್ರೀಯ ಸಂಗೀತ)</li>
                <li>ನಳಿನಿ ಮೋಹನ್(ಪಿಟೀಲು)</li>
                <li>ಸುಕನ್ಯ ರಾಮಗೊಪಾಲ್(ಘಟಮ್)</li>
                <li>ಶ್ರೀ.ಅನಂತ ಕೃಷ್ಣ ಶಮ(ಮ್ರುದಂಗ)(೧೯೯೬)</li>
                <li>ನಾಗೇಶ್ ಮತ್ತು ಸುಮನ(ನೃತ್ಯ)</li>
                <li>ಶ್ರೀ. ಸುರೇಶ್ (ಕೊಳಲು)</li>
                <li>ಆರ್.ಕೆ.ಸೂರ್ಯನಾರಾಯಣ(ವೀಣೆ)</li>
                <li>ಪ್ರಸನ್ನ ಕುಮಾರ್(ಮ್ರುದಂಗ)</li>
              </ul>
              <br />
            </div>

            <p>ದಿವಂಗತ ಅನಂತಸ್ವಾಮಿಯವರ ಮಕ್ಕಳಾದ
              ಸುನೀತ ಮತ್ತು ರಾಜು ಅನಂತಸ್ವಾಮಿ(ಸುಗಮ ಸಂಗೀತ)(೧೯೯೮),ಕಾವೆರಿ ಶ್ರೀಧರ್, ಶ್ರೀನಾತ್ ಶೆಣೈ, ರಾಧಾಕ್ರಿಷ್ಣ, ರಥಮಾಲ ಪ್ರಕಾಶ್,
              ಮಾಲತಿ ಶರ್ಮ, ತಿಮ್ಮರಾಜು, ಶ್ರೀರಾಮ್, ಮಂಜುಳ ಗುರುರಾಜ್, ಗುರುರಾಜ್, ಪುತ್ತೂರು ನಸಿಂಹನಾಯಕ್,ಪ್ರವೀಣ್, ಚರಣ್,
              ದಯಾನಂದ(ಹಾಸ್ಯ)(೧೯೯೮).ಸಂಗೀತ ಕಟ್ಟಿ.&quot;ನೂಪುರ&quot;ದ ನಿರ್ದೇಶಕಿ ಲಲಿತ ಶ್ರೀನಿವಾಸನ್ ರವರು ತಮ್ಮ ಶಾಲೆಯ ಆರು
              ವಿಧ್ಯಾರ್ಥಿಗಳಿಂದ &quot;ನೃತ್ಯ ನಾಟಕ&quot;ವನ್ನು ಕನ್ನಡ ಭಾವಗೀತೆಗಳಿಗೆ ಅಳವಡಿಸಿ ಅಭಿನಯಿಸಿದ ಭರತ ನಾಟ್ಯ, ಅಭಿನಯ, ಸಾಹಿತ್ಯ,ರಾಗ ಭಾವ
              ತುಂಬಿದ ಮನೋಹರ ನಾಟ್ಯ ವಾಗಿತ್ತು.</p>
            <p>ಹರಿಕತೆಯ ಪ್ರಖ್ಯಾತಿ ಭದ್ರಗಿರಿ ಸರ್ವೋತ್ತಮ ದಾಸರು ಸಹ ಬಂದಿದ್ದರು. ಸಿರಿಗೆರೆ ಶ್ರೀ ತರಳಬಾಳು ಜಗದ್ಗುರು ಡಾ. ಶಿವಮೂರ್ತಿ ಶಾಸ್ತ್ರಿ ಮತ್ತು
              ಆದಿ ಚುಂಚನಗಿರಿ ಮಟದ ಜಗದ್ಗುರು ಶ್ರೀ. ಭಾಲಗಂಗಧರನಾಥ ಸ್ವಾಮಿಗಳು ಒಟ್ಟಿಗೆ ನಮ್ಮ ಕೂಟಕ್ಕೆ ಬಂದು ನಮ್ಮನ್ನು ಆಶೀರ್ವದಿಸಿದರು.
              ಚಿನ್ಮಯ ಸಂಸ್ಥೆಯ ಚಿದಾನಂದ ಸ್ವಾಮಿಗಳ &quot;ಮಂಕುತಿಮ್ಮನ ಕಗ್ಗ&quot; ದ ವಿನ್ಯಾಸ ಜನರ ಮನಸ್ಸನ್ನು ಮರುಗುಮಾಡಿತ್ತು.ಸುಪ್ರಸಿದ್ದ ಸಾಹಿತಿ
              ಡಾ.ಲಕ್ಷ್ಮಿನಾರಾಯಣ ಭಟ್ಟರು &quot;ಶರೀಫ಼್ ಸಾಹಿತಿ&quot; ಮತ್ತು &quot;ಸಾಹಿತ್ಯದ ನಮಗೆ ಅವಶ್ಯಕತೆ&quot; ಎಂಬ ಮಾಡಿದ ಭಾಷಣ ವಿಚಾರಾತ್ಮಕ ವಾಗಿತ್ತು.</p>
            <p>೧೯೮೪ ರಲ್ಲಿ ಡಾ. ರಾಮಸ್ವಾಮಿ ಯವರ ದೂರಧೃಷ್ಟಿಯಿಂದ ಯು.ಎಸ್. ಸರ್ಕಾರದಿಂದ &quot;ಲಾಭಕ್ಕಿಲ್ಲದ ಸಂಸ್ಕೃತಿ&quot; ಎಂದು ಅನುಮತಿ
              ಪಡೆಯಿತು. ನಂತರ ಜಾರ್ಜಿಯ ಪ್ರಾಂತ್ಯದ ಸರ್ಕಾರದಿಂದಲೂ ಅನುಮತಿ ಪಡೆದಿದೆ. ಕರ್ನಾಟಕ ಕನ್ನಡ ಸಾಹಿತ್ಯ ಪರಿಷತ್ತು ನಮ್ಮ ಕನ್ನಡ ಅಭಿಮಾನವನ್ನು ಮೆಚ್ಚಿ ಕನ್ನಡ ಪುಸ್ತಕಗಳನ್ನು ಬಳುವಳಿಯಾಗಿ ಕೊಟ್ಟಿಂದರಿಂದ ಪುಸ್ತಕ
              ಭಂಡಾರ ವನ್ನು ನಮ್ಮ ಕನ್ನಡ ಕೂಟ ತೆರೆದಿದೆ. ಇದನ್ನು ಮೊದಲು ಶ್ರೀಮತಿ. ಜಯಶ್ರೀ ಸಿಂಗ್ ಈಗ ವಾಣಿ ರಾವ್ ನೋಡಿಕೊಳ್ಳುತ್ತಿದ್ದಾರೆ.</p>
            <p>೧೯೯೫ ರಲ್ಲಿ ನಡೆದ ಆಗ್ನೇಯ ದಿಕ್ಕಿನ ಕನ್ನಡ ಸಮ್ಮೇಳನಕ್ಕೆ ಈ ಪ್ರಾಂತ್ಯದ ಕನ್ನಡ ಸಂಘಗಳ ಸದಸ್ಯರು ಅತಿ ಸಂಖ್ಯೆಯಲ್ಲಿ ಭಾಗವಹಿಸಿದ್ದರು.
              ನಾಟಕ ಕಲಾವಿದ ಮಾಸ್ಟರ್ ಹಿಯಣ್ಣಯ್ಯ ಅವರ ಮಕ್ಕಳಾದ ಕಣತೂರು ಹಿರಣ್ಣಯ್ಯ ಮತ್ತು ಶ್ರೀಕಾಂತ್ ಅರ್ಪಿಸಿದ &quot;ಲಂಚಾವತಾರ ಮತ್ತು
              ನಡು ಬೀದಿ ನಾರಯಣ ಅಂದಿನ ಪ್ರೇಕ್ಷಕರನ್ನು ನಗಿಸಿದ್ದು ಇಂದಿಗೂ ಕಣ್ಣಲ್ಲಿ ಕಟ್ಟಿದಂತಿದೆ. ಆ ಸಮ್ಮೇಳನದ ಸಂಭ್ರಮ ಮತ್ತು ಅದ್ದೂರಿಯ ಊಟ
              ಜನರನ್ನು ಮರುಗುಮಾಡಿತ್ತು.</p>
            <p>ಮಾಸ್ಟರ್ ಹಿಯಣ್ಣ್ಯ ಅವರು ೨೦೯೯ ರಲ್ಲಿ ಮತ್ತೊಮ್ಮೆ ಬಂದು &quot;ನಡುಬೀದಿ ನಾರಾಯಣ ಮತ್ತು ಪಶ್ಥಾತಾಪ ನಾಟಕವನ್ನು ಪ್ರಧರ್ಶಿಸಿದ್ದರು.
              ೨೫ನೇ ವಾರ್ಷಿಕೋತ್ಸವ ದಲ್ಲಿ ಇಂದಿರ ರಾಮಸ್ವಾಮಿ ಯವರು ಬರೆದು ನಿರ್ದೇಶಿಸಿದ &quot;ನಾಟಕ ಬೆಳ್ಳಿ ಮಹೊತ್ಸವ&quot; ಮತ್ತು ಹಂಟ್ಸವಿಲ್ಲಿನ ಡಾ.
              ಹೆಗ್ಗೆರೆ ರಂಗನಾತ್ ರವರು ಬರೆದು ನಿರ್ದೇಶಿಸಿದ &quot; ಆಪರೇಶನ್ ಶ್ರೀರಂಗಪಟ್ಟಣ&quot;, ಅಗಸ್ಟ ನಗರದ ಸದಸ್ಯರು ಪ್ರದರ್ಶಿಸಿದ ವಿವಿದ
              ಮನೋರಂಜನೆ ಕಾರ್ಯಕ್ರಮ ಜನರ ಮೆಚ್ಚುಗೆಯನ್ನು ಪಡೆಯಿತು.</p>
            <p>೨೦೦೪ ರಲ್ಲಿ ಧಕ್ಷಿಣ ಭಾರತ ಸಾಂಸ್ಕೃತಿಕ ಕಾರ್ಯಕ್ರಮವನ್ನು ಏರ್ಪಡಿತ್ತು. ತಮಿಳು, ತೆಲುಗು ಮತ್ತು ಮಲೆಯಾಳಿ ಸಂಘಗಳು
              ಕಾರ್ಯಕ್ರಮದಲ್ಲಿ ಭಾಗವಸಿದ್ದರು. ಇಡೀ ದಿನದ ಮನರಂಜನೆಯ ಕಾರ್ಯಕ್ರಮ ವಿವಿಧ ಪೂರ್ಣವಾಗಿತ್ತು.
              ಡಾ.ಸುಬ್ರಹ್ಮಣ್ಯ ಭಟ್ ಮತ್ತು ಡಾ.ಅನ್ನಪೂರ್ಣ ಭಟ್ ಅವರ ಔದಾರ್ಯದಿಂದ ಪ್ರತೀ ವರ್ಷವೂ ೪೦೦೦ ಡಾಲರ್ ಮೊತ್ತದ
              ವಿಧ್ಯಾರ್ತಿವೇತನವನ್ನು ನೀಡುತ್ತಿರುವುದು ಶ್ಲಾಘನೀಯ. ಇಲ್ಲಿಯವರೆವಿಗೂ ಸ್ವೀಕರಿಸಿದ ವಿಧ್ಯಾರ್ತಿಗಳ ವಿವರ ನಮ್ಮ ವೆಬ್ ನಲ್ಲಿದೆ.
              ೩೦ ಮತ್ತು ೩೫ ವರ್ಷದ ವಾರ್ಷಿಕೋತ್ಸವ ಸಂಭ್ರಮ ವಿಜೃಂಭಣೆ ಯಿಂದ ನಡೆಯಿತು.ಆಗ ಹೊರ ತಂದ ಸ್ಮರಣೆ ಸಂಚಿಕೆ ಆಕರ್ಶೀಯಣೆ
              ಯಾಗಿತ್ತು.</p>
            <p>೨೦೧೨ ರಲ್ಲಿ ೭ನೇ ಅಕ್ಕ ಸಮ್ಮೇಳನ &quot;ನೃಪತುಂಗ ಕನ್ನಡ ಕೂಟದ ಆಶ್ರಯದಲ್ಲಿ ನೆರವೇರಿಸಿದ್ದು ನಮ್ಮ ಕೂಟದ ಇತಿಹಾಸದಲ್ಲಿ ಒಂದು
              ಸುವರ್ಣ ದಿನ.</p>
            <p>ಅನೇಕ ಅಧ್ಯಾತ್ಮಿಕ ಗುರುಗಳು, ಸಾಹಿತಿಗಳು, ಕಲಾವಿದರು ಆಗಮಿಸಿ ನಮ್ಮ ಕಾರ್ಯಕ್ರಮಕ್ಕೆ ಮೆರುಗು ಕೊಟ್ಟರು. ಭಾರತದ ರಾಯಭಾಯಿ
              ಆನುಪಮ ರಾವ್ ಮತ್ತು ಪರೋಪಕಾರಿ ಶ್ರೀಮತಿ.ಸುಧಾ ಮೂರ್ತಿ ಭಾಗವಸಿದ್ದು ಎಲ್ಲರನ್ನು ಮೆಚ್ಚಿಸಿತ್ತು. ಆ ಸಮ್ಮೇಳನ ಇಂದಿಗೂ
              ಮಾದರಿಯಾಗಿ ನಿಂತಿದೆ ಜ್ಝಾನಪೀಠ ಪ್ರಶಸ್ತಿ ಗಳಿಸಿದ ಡಾ. ಕಂಬಾರ, ಸಾಹಿತಿ ಟಿ.ಎನ್.ಸೀತಾರಾಮ್, ಪ್ರಜವಾಣಿ ಸಂಪಾದಕರು ಮುಂತಾದ
              ಶ್ರೇಷ್ಠ ವ್ಯಕ್ತಿಗಳ ಆಗಮನ ನಮ್ಮ ಕೂಟದ ಘನತೆಯನ್ನು ಹೆಚ್ಚಿಸಿತ್ತು. ಕರ್ಣಾಟಕದ ಪತ್ರಿಕೆಗಳಲ್ಲಿ ನಮ್ಮ ಕಾರ್ಯಕ್ರಮದ ವೈಖರಿಯನ್ನು
              ಶ್ಲಾಘಿಸಿ ಬರೆದ ವ್ಯಾಖ್ಯಾನ ಓದುವಂತಹುದು.
            </p>
            <p>೨೦೧೦ರಲ್ಲಿ ಡಗ್ಲಸ್ ರಸ್ತೆ ಯನ್ನು ದತ್ತು ತೆಗೆದುಕ್ಕೊಂಡು ಅದರ ಸ್ವಚ್ಛತೆ ಜವಬ್ದಾರಿಯನ್ನು ನಮ್ಮ ಕನ್ನಡ ಕೂಟ ವಹಿಸಿತು. ಅದಕ್ಕಾಗಿ
              ಇಲ್ಲಿಯವರೆವಿಗೂ ಅನೇಕ ಸ್ವಯಂ ಸೇವಕರ ನೆರೆವಿನಿಂದ ಕಸ ನಿರ್ಮೂಲನೆಯನ್ನ ಶ್ರೀ. ಮನು ರಾವ್ ರವರ ನೇತೃತ್ವದಲ್ಲಿ ನಡೆಯಿತ್ತಿದೆ. ಆ
              ರಸ್ತೆಯಲ್ಲಿ ಅಟ್ಲಾಂಟ ನಗರ ನೆಟ್ಟಿರುವ ಪಲಕೆ ಹರ್ಷತರುತ್ತದೆ.</p>
            <p>೪೦ ನೇ ವಾರ್ಷಿಕೋತ್ಸವ ವನ್ನು ಶ್ರೀಮತಿ. ಪುಷ್ಪ ಸುಧರ್ಶನ ರವರ ನೇತೃತ್ವದಲ್ಲಿ ನಡೆಯಿತು. ಶ್ರೀಮತಿ ಬಿ.ಕೆ. ಸುಮಿತ್ರ ಅವರ ಮಧುರ
              ಸಂಗೀತ ಎಲ್ಲರ ಮನಸ್ಸನ್ನ ಆಕರ್ಶಿಸಿತ್ತು.
              ಶ್ರೀಯುತ ಪ್ರದೀಪ್ ರವರ ಅಧ್ಯಕ್ಷರಾಗಿದ್ದಾಗ ಎರ್ಪಡಿಸಿದ್ದ ನಾಟಕ ಕಾರ್ಯಕ್ರಮದಲ್ಲಿ ಪ್ರಭಾತ್ ಕಲಾವಿದರು ಅಭಿನಯಿದ ನೃತ್ಯ ನಾಟಕ
              ಅದ್ಭುತವಾಗಿತ್ತು.</p>
            <p>೪೫ನೇ ವಾರ್ಷಿಕೋತ್ಸವ ಡಾ.ಸುಬ್ರಹ್ಮಣ್ಯ ಭಟ್ ಮತ್ತು ಡಾ.ಅನ್ನಪೂರ್ಣ ಭಟ್ ರವರ ನೇತ್ರುತ್ವದಲ್ಲಿ ವಿಜ್ರುಂಭಣೆಯಿಂದ ಜರುಗಿತು. ಅವರ
              ತನು,ಮನ ಮತ್ತು ಧನ ಸಹಾಯದಿಂದ ಇಂತಹ ಸಮಾರಂಭ ನಡೆಸಲಾಯ್ತು, ಸಂತೋಶ್ ಕುಮಾರ್ ಮತ್ತು ಪ್ರದೀಪ್ ವಿಟಲ್ ಮೂರ್ತಿ
              ಅಧ್ಯಕ್ಷರಾಗಿ ಕಾರ್ಯ ನಿರ್ವಹಿಸಿದರು.</p>
            <p>ಸಾಹಿತಿ ಜಯಂತ ಕೈಕಿಣಿ ಮತ್ತು ಕಲಾವಿದರಾದಜಯಶ್ರೀ ದೇಶಪಾಂಡೆ, ಕೌಶಿಕ್,ನಟ ಶ್ರೀನಾಥ್ ಸಂಗೀತ ಗಾರರಾದ ಪ್ರವೀಣ್
              ರಾವ್,ಅಜಯ್ ವಾರಿಯರ್ ಮತ್ತು ವಾರಿಜಶ್ರೀ ಅವರ ಆಗಮನದಿಂದ ಸಂಭ್ರಮಕ್ಕೆ ಮೆರುಗುಕೊಟ್ಟಿತ್ತು. ಅಲಂಕರಿಸಿದ ವಾತಾವರಣ ಹಾಗೂ
              ರುಚಿಕರವಾದ ಊಟದ ವ್ಯವಸ್ತೆ ನೆರೆದಿದ್ದ ೫೫೦ ಸಭಿಕರ ಮನಸ್ಸನ್ನು ಹರ್ಷಗೊಳಿಸಿತ್ತು.</p>
            <p>ನಿಮ್ಮ ನಿಸ್ವಾರ್ಥಸೇವೆಯಿಂದ, ಧೃಡಸಂಕಲ್ಪದಿಂದ ನೀವು ಬೆಳೆಸಿದ ಈ ಕನ್ನಡ ಕೂಟ ಇಲ್ಲಿಯವರೆವಿಗೂ ಈ ಮಹಾ ನಗರದಲ್ಲಿ ಕನ್ನಡಿಗರನ್ನು
              ಒಂದು ಗೂಡಿಸಿ, ಮಕ್ಕಳಿಗೆ ಪ್ರೊತ್ಸಾಹ ನೀಡಿ , ನಮ್ಮ ಭಾಷೆ, ಸಸ್ಕೃತಿಮತ್ತು ಸಂಪ್ರದಾಯಗಳು ಅಳಿಸದಂತೆ, ಎಲ್ಲರ ಮನಸ್ಸಿನ ಮೇಲೆ
              ಗಾಡವಾದ ಪರಿಣಾಮ ಬೀಳುವಂತೆ ಶ್ರಮಿಸುತ್ತಿದೆ.ಇಲ್ಲಿಯವರೆವಿಗೂ ನಡೆಸಿಕೊಟ್ಟ ಕಾರ್ಯಕ್ರಮಗಳ ಸಮೀಕ್ಷೆ ಮಾಡಿದರೆ ನಿಮಗೆ
              ಅರಿವಾಗುವುದು ಅದರ ಆಕಾಂಕ್ಷೆ ಮತ್ತು ವ್ಯಾಪ್ತಿ. ಇದು ಒಂದು ಸಾಧನಕೇರಿ, ಇಲ್ಲಿ ಸಮರಸ, ಸೌಹಾರ್ದತೆ ಮತ್ತು ವಿಶ್ವಾಸದ ಆದರತೆಯಿದೆ.
              ಅಭಿಮಾನ, ಕಾರ್ಯಾಸಕ್ತಿ ಮತ್ತು ಶ್ರದ್ದೆಯಿಂದ ದುಡಿಯಿತ್ತಿರುವ ಸಧಸ್ಯರಿಗೆ ನಮ್ಮ ಅಭಿನಂದನೆಗಳು.</p>
            <p>ಕನ್ನಡಿಗರೆಲ್ಲರೂ ಒಟ್ಟಾಗಿ ಸೇರಿ, ಕನ್ನಡತನವನ್ನು, ಕನ್ನಡ ಭಾಷೆ ಸಂಸ್ಕೃತಿಯನ್ನು ಪ್ರತಿಬಿಂಬಿಸುವ ಸಂಸ್ಥೆ ಜಾರ್ಜಿಯ ರಾಜ್ಯದ ಅಟ್ಲಾಂಟ ನಗರದಲ್ಲಿರುವ ನೃಪತುಂಗ ಕನ್ನಡ ಕೂಟ. ಇದು ಜಾರ್ಜಿಯ ರಾಜ್ಯದಿಂದ ಅಂಗೀಕರಿಸಲ್ಪಟ್ಟ ಸಂಸ್ಥೆಯಾಗಿದೆ. </p>
            <p>ಅಟ್ಲಾಂಟ ನಗರದ ಸುತ್ತಮುತ್ತಲಿನ ಕನ್ನಡಿಗರನೆಲ್ಲರನ್ನೂ  ಒಂದುಗೂಡಿಸಿ, ಕನ್ನಡವನ್ನು ಉಳಿಸಿ ಬೆಳೆಸುವುದೇ ಈ ಸಂಸ್ಥೆಯ ಧ್ಯೇಯವಾಗಿದೆ. ಸರಿಸುಮಾರು 45 ವರ್ಷಗಳ ಹಿಂದೆ ಅಟ್ಲಾಂಟಾದಲ್ಲಿ ಕನ್ನಡದ ಬಾಂಧವರು ಹೆಚ್ಚಾಗಿ ಇರಲಿಲ್ಲ... ಸಮಯ ಸಾಗಿದಂತೆ ತಮ್ಮ ಓದು ಹಾಗೂ ಕಾರ್ಯನಿಮಿತ್ತವಾಗಿ ಹಲವಾರು ವಿದ್ಯಾರ್ಥಿಗಳು ತಮ್ಮ ಗುರಿ ಸಾಧಿಸಲು ಹೊರದೇಶಗಳಿವೆ ಹೊರಟರು. ಹೀಗೆ ಕನ್ನಡದ ಕಂಪನ್ನು ಸೂಸುವ ಕನ್ನಡಿಗರು ಹೆಚ್ಚಾದಂತೆ ಒಂದು ಸಂಘವನ್ನು ಆರಂಭಿಸುವ ಆಲೋಚನೆ ಮುಂದಾಯಿತು...</p>
            <p>ಮಿಷಿಗನ್ ಪ್ರಾಂತ್ಯದ ಹಲವಾರು ಕನ್ನಡದ ಮನಸ್ಸುಗಳು ಡಾ।। ಹೊ . ನ. ರಾಮಸ್ವಾಮಿರವರಿಗೆ ಒಂದು ಕನ್ನಡ ಕೂಟವನ್ನು ಸ್ಟಾಪಿಸುವ ಸಲಹೆ ಕೂಡ ಕೊಟ್ಟರು... <span style={{ color: 'var(--color-primary-2)', fontWeight: 600 }} > 1973</span> ಶ್ರೀ ಪ್ರಮಾದಿನಾಮ ಸಂವತ್ಸರದ ಉಗಾದಿಯಂದು ಡಾ।। ಹೊ . ನ. ರಾಮಸ್ವಾಮಿಯವರ  ಸ್ವಗೃಹದಲ್ಲಿ ಅನೇಕ ಕನ್ನಡ ಪರ ಮನಸ್ಸುಗಳು ಒಂದಾಗಿ ನೃಪತುಂಗ ಕನ್ನಡ ಕೂಟವನ್ನು ಸ್ಥಾಪಿಸಿದರು. ಕೇವಲ ಭಾರತೀಯ ಹಬ್ಬಗಳನ್ನು ಆಚರಿಕೊಂಡಿದ್ದ ಕನ್ನಡಿಗರು, ಕಾಲಕ್ರಮೇಣ ಕನ್ನಡ ಕೂಟವನ್ನು ಒಂದು ವ್ಯವಸ್ಥಿತ ಸಂಸ್ಥೆಯನ್ನಾಗಿ ಬೆಳೆಸತೊಡಗಿದರು.</p>
            <p><span style={{ color: 'var(--color-primary-2)', fontWeight: 600 }} >45 </span> ವರ್ಷದ ಈ <span style={{ color: 'var(--color-primary-2)', fontWeight: 600 }} >ನೃಪತುಂಗ ಕನ್ನಡ ಕೂಟ, </span> ಕೇವಲ ಸಾಂಸ್ಕೃತಿಕ ಕಾರ್ಯಕ್ರಮಗಳನ್ನು ಬಿಂಬಿಸುವ ಸಂಸ್ಥೆಯಾಗದೆ, ಕನ್ನಡಿಗರ ಪರವಾಗಿ, ಸಮಾಜ ಮುಖಿಯಾದ ಕಾರ್ಯಕ್ರಮಗಳನ್ನು ಹಮ್ಮಿಕೊಂಡು, ಹೊರದೇಶದಲ್ಲೂ ಕನ್ನಡದ ಹಣತೆಯನ್ನು ಬೆಳಗುತ್ತಿದೆ. ಯಾವುದೇ ಲಾಭವನ್ನು ನಿರೀಕ್ಷ್ಕ್ಷಿಸದೆ ಕೇವಲ ಕನ್ನಡಕ್ಕಾಗಿ ಪಣ ತೊಟ್ಟು ನಿಂತಿರುವ ನೃಪತುಂಗ ಕನ್ನಡ ಕೂಟ ಮಾದರಿಯಾಗಲಿ.</p>
            <p></p>
            <h2 style={{ color: 'var(--color-primary-2)', fontWeight: 600 }}>ಸಿರಿ ಗನ್ನಡಂ ಗೆಲ್ಗೆ, ಸಿರಿ ಗನ್ನಡಂ ಬಾಳ್ಗೆ! ...</h2>
            <br />
            <p style={{ color: 'var(--color-primary-2)', fontWeight: 600 }}>ಇಲ್ಲಿಂದ ಮುಂದೆ ನೃಪತುಂಗ ಕನ್ನಡ ಕೂಟ ನಮ್ಮೆಲ್ಲರದ್ದಾಗಿರುವುದರಿಂದ, ನಾವುಗಳು ನಮ್ಮ ಕೂಟವೆಂದೇ ಓದಬೇಕೆಂದು ಮನವಿ.</p>
            <p>ಇಂದಿಗೆ 45 ವರ್ಷಗಳನ್ನು ಆಚರಿಸುತ್ತಿರುವ ನಮ್ಮ ಕೂಟವು ಕೇವಲ ಒಂದು ಸಾಂಸ್ಕೃತಿಕ ಕಾರ್ಯಕ್ರಮಗಳನ್ನು ನೆಡೆಸುವ ಸಂಸ್ಥೆಯಾಗದೆ, ಕನ್ನಡ. ಸಮುದಾಯ, ನಮ್ಮ ತಾಯ್ನಾಡು ಮತ್ತು ನಾವಾಗಿ ಒಪ್ಪಿಕೊಂಡ ಅಮೇರಿಕನಾಡಿಗೆ ಕೂಡ ನೆರೆವಾಗುವಂತೆ ಸಮಾಜದ ಬಹುಮುಖಿಯಾಗಿ ತನ್ನನ್ನು ತಾನು ತೊಡಗಿಸಿಕೊಂಡ ಸಂಸ್ಥೆಯಾಗಿ ಬೆಳೆಯುತ್ತಿರುವುದು ಬಹಳ ಹೆಮ್ಮೆಯ ವಿಷಯವೆನಿಸುತ್ತದೆ.</p>
          </div>
        </div>
      </section >
    </>
  );
}

