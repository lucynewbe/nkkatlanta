import { useEffect, useState } from 'react';
import { useScrollReveal } from '../hooks/useApi';
import Seo from '../components/Seo.jsx';
import PageHeader from '../components/PageHeader.jsx';

export default function Donate() {
  const [url, setUrl] = useState('https://www.zeffy.com/en-US/ticketing/nkk-annual-donations--2026');
  useScrollReveal();
  useEffect(() => {
    window.scrollTo(0, 0);
    fetch('/api/content').then(r => r.json()).then(c => { if (c.donate_url) setUrl(c.donate_url); }).catch(() => {});
  }, []);

  return (
    <>
      <Seo title="Donate" description="Support Nrupathunga Kannada Koota, a 501(c)(3) serving Greater Atlanta Kannadigas since 1973." />
      <PageHeader tag="Seva" title="Give to" accent="NKK" subtitle="Your gift funds festivals, scholarships, and charity. NKK is an IRS 501(c)(3) nonprofit." />
      <section>
        <div className="container" style={{ maxWidth: 720, textAlign: 'center' }}>
          <div className="glass-card invite-card reveal">
            <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.85, marginBottom: '2rem' }}>
              Donations are processed securely on Zeffy. NKK never stores card numbers on this website.
            </p>
            <a href={url} className="btn btn-gold" target="_blank" rel="noopener noreferrer">Donate on Zeffy</a>
          </div>
        </div>
      </section>
    </>
  );
}
