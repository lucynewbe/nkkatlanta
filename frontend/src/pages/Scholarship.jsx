import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useApi';

const ELIGIBILITY = [
  'Child of an active NKK paid member family',
  'High school student graduating or enrolled in college',
  'Demonstrated academic excellence and achievement',
  'Involvement in community service or extracurricular activities',
  'Letter of recommendation required',
  'Personal essay on community contribution',
];

const STEPS = [
  { n: '1', title: 'Ensure NKK Membership', desc: 'Your family must be a paid NKK member for the current year before applying.' },
  { n: '2', title: 'Contact NKK', desc: 'Reach out to us at info@atlantakannada.org to request the scholarship application form.' },
  { n: '3', title: 'Submit Application', desc: 'Complete and submit with all required documents, transcripts, and letters of recommendation.' },
  { n: '4', title: 'Award Ceremony', desc: 'Recipients are honored at our annual Rajyotsava celebration in front of the entire NKK community.' },
];

export default function Scholarship() {
  useScrollReveal();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <header className="page-header">
        <div className="page-tag">Academic Excellence</div>
        <h1 className="page-title">Muteri <span className="gradient-text">Scholarship</span></h1>
        <p className="page-subtitle">Empowering the next generation of Kannada youth through academic support and community investment.</p>
        <div className="divider" />
      </header>

      <section>
        <div className="container">
          {/* Hero */}
          <div style={{ textAlign: 'center', padding: '3rem', background: 'linear-gradient(135deg,rgba(200,132,26,0.06),rgba(124,58,237,0.06))', borderRadius: '32px', marginBottom: '4rem' }} className="reveal">
            <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>🎓</div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: '1rem' }}>The Muteri Scholarship Program</h2>
            <div style={{ fontFamily: 'var(--font-kannada)', fontSize: '1rem', color: 'var(--color-primary-2)', marginBottom: '1.5rem' }}>ಮುತೇರಿ ವಿದ್ಯಾರ್ಥಿ ವೇತನ</div>
            <p style={{ color: 'var(--color-text-muted)', maxWidth: 650, margin: '0 auto', lineHeight: 1.9, fontSize: '1.05rem' }}>
              NKK's Muteri Scholarship Program reflects our commitment to investing in the future of Kannada youth in Atlanta. We believe that by supporting academic excellence, we strengthen both the community and the next generation of Kannadiga leaders.
            </p>
          </div>

          {/* Features */}
          <div className="grid-3" style={{ marginBottom: '5rem' }}>
            {[
              { icon: '📚', title: 'Academic Support', desc: 'Financial assistance for students pursuing higher education, recognizing merit and community involvement.' },
              { icon: '🌟', title: 'Community Legacy', desc: 'Named in honor of a beloved community member, carrying forward a legacy of giving and service.' },
              { icon: '🤝', title: 'NKK Membership', desc: 'Scholarship applicants must be from active NKK member families, reinforcing community engagement.' },
            ].map((f, i) => (
              <div className={`glass-card reveal${i ? ` reveal-delay-${i}` : ''}`} key={f.title} style={{ padding: '2rem', textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{f.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', color: 'var(--color-primary-2)', marginBottom: '0.5rem' }}>{f.title}</h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>

          {/* Eligibility + Process */}
          <div className="grid-2" style={{ gap: '3rem', alignItems: 'start' }}>
            <div className="reveal">
              <div className="section-tag">Eligibility</div>
              <h2 className="section-title" style={{ textAlign: 'left', fontSize: '2rem' }}>Who Can <span className="accent">Apply?</span></h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
                {ELIGIBILITY.map(e => (
                  <div className="charity-item" key={e}><div className="charity-dot" /><span className="charity-name">{e}</span></div>
                ))}
              </div>
            </div>
            <div className="reveal reveal-delay-2">
              <div className="section-tag">How to Apply</div>
              <h2 className="section-title" style={{ textAlign: 'left', fontSize: '2rem' }}>Application <span className="accent">Process</span></h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1.5rem' }}>
                {STEPS.map(s => (
                  <div key={s.n} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(200,132,26,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'var(--color-primary-2)', flexShrink: 0 }}>{s.n}</div>
                    <div>
                      <div style={{ fontWeight: 600, marginBottom: '0.2rem' }}>{s.title}</div>
                      <div style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div style={{ textAlign: 'center', background: 'linear-gradient(135deg,rgba(200,132,26,0.08),rgba(124,58,237,0.08))', border: '1px solid rgba(200,132,26,0.18)', borderRadius: '24px', padding: '3rem', marginTop: '4rem' }} className="reveal">
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✉️</div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', marginBottom: '0.75rem' }}>Questions About the <span className="gradient-text">Scholarship?</span></h2>
            <p style={{ color: 'var(--color-text-muted)', maxWidth: 460, margin: '0 auto 2rem' }}>Contact our scholarship committee — we're happy to guide you through the application process.</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="mailto:info@atlantakannada.org" className="btn btn-primary">📧 Email Us About Scholarship</a>
              <Link to="/membership" className="btn btn-outline">Join NKK First →</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
