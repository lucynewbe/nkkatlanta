import { useEffect, useState } from 'react';
import { useScrollReveal } from '../hooks/useApi';
import Seo from '../components/Seo.jsx';
import PageHeader from '../components/PageHeader.jsx';

export default function News() {
  const [posts, setPosts] = useState([]);
  useScrollReveal([posts.length]);
  useEffect(() => {
    window.scrollTo(0, 0);
    fetch('/api/news').then(r => r.json()).then(setPosts).catch(() => []);
  }, []);

  return (
    <>
      <Seo title="News" description="Announcements from Nrupathunga Kannada Koota Atlanta." />
      <PageHeader tag="Community" title="NKK" accent="News" subtitle="Festival dates, membership, and seva — from the board to the community." />
      <section>
        <div className="container">
          <div className="news-grid">
            {posts.map(p => (
              <article key={p.id} className="glass-card news-card reveal" style={{ padding: '1.75rem' }}>
                <time dateTime={p.created_at}>{new Date(p.created_at).toLocaleDateString()}</time>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', margin: '0.5rem 0 0.75rem' }}>{p.title}</h2>
                <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7 }}>{p.body}</p>
              </article>
            ))}
            {posts.length === 0 && <p style={{ color: 'var(--color-text-muted)' }}>No announcements yet.</p>}
          </div>
        </div>
      </section>
    </>
  );
}
