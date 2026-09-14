import { useEffect, useState } from 'react';
import { useScrollReveal } from '../hooks/useApi';
import Seo from '../components/Seo.jsx';
import PageHeader from '../components/PageHeader.jsx';

export default function Gallery() {
  const [albums, setAlbums] = useState([]);
  const [lightbox, setLightbox] = useState(null);
  const [libraryUrl, setLibraryUrl] = useState('https://sites.google.com/view/nkkpictures/home');

  useScrollReveal([albums.length]);
  useEffect(() => {
    window.scrollTo(0, 0);
    fetch('/api/gallery').then(r => r.json()).then(setAlbums).catch(() => []);
    fetch('/api/content').then(r => r.json()).then(c => { if (c.photos_library_url) setLibraryUrl(c.photos_library_url); }).catch(() => {});
  }, []);

  const open = (src, title) => {
    setLightbox({ src, title });
    document.body.style.overflow = 'hidden';
  };
  const close = () => {
    setLightbox(null);
    document.body.style.overflow = '';
  };

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const photos = albums.flatMap(a => (a.photos || []).map(p => ({ ...p, album: a.title })));

  return (
    <>
      <Seo title="Gallery" description="Photos from NKK Atlanta celebrations — Ugadi, Rajyotsava, and community life." />
      <PageHeader tag="Memories" title="NKK" accent="Gallery" subtitle="Relive cherished community moments from Ugadi to Rajyotsava." />

      <section>
        <div className="container">
          <div className="gallery-masonry">
            {photos.map((item, i) => (
              <div
                key={item.id}
                className={`gallery-item reveal${i % 3 ? ` reveal-delay-${i % 3}` : ''}`}
                onClick={() => open(item.image_url, item.caption)}
                onKeyDown={e => e.key === 'Enter' && open(item.image_url, item.caption)}
                role="button"
                tabIndex={0}
                aria-label={item.caption || 'View photo'}
              >
                <img src={item.image_url} alt={item.caption || ''} loading="lazy" />
                <div className="gallery-overlay">
                  <div className="gallery-title">{item.caption}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="ext-link-card reveal">
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: '1rem' }}>
              Full photo library
            </h2>
            <p style={{ color: 'var(--color-text-muted)', maxWidth: 520, margin: '0 auto 2rem' }}>
              Browse hundreds of photos from NKK events on our archive site.
            </p>
            <a href={libraryUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Browse archive</a>
          </div>
        </div>
      </section>

      <div className={`lightbox${lightbox ? ' open' : ''}`} onClick={close} role="dialog" aria-modal={!!lightbox} aria-hidden={!lightbox}>
        <button className="lightbox-close" onClick={close} aria-label="Close">×</button>
        {lightbox && (
          <img src={lightbox.src} alt={lightbox.title || 'Event photo'} onClick={e => e.stopPropagation()} />
        )}
      </div>
    </>
  );
}
