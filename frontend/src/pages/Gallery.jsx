import { useEffect, useState } from 'react';
import { useScrollReveal } from '../hooks/useApi';

const GALLERY_ITEMS = [
  {
    thumb: 'https://static.wixstatic.com/media/91e833_de8b5c2b93ac40568fcbb1b78bc404ea~mv2.jpg/v1/fill/w_600,h_450,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/img.jpg',
    full: 'https://static.wixstatic.com/media/91e833_de8b5c2b93ac40568fcbb1b78bc404ea~mv2.jpg',
    title: 'NKK Participation in Indian Independence Day, IACA',
  },
  {
    thumb: 'https://static.wixstatic.com/media/91e833_1be0c962982b46c299448d730e141494f002.jpg/v1/fill/w_600,h_450,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/img.jpg',
    full: 'https://static.wixstatic.com/media/91e833_1be0c962982b46c299448d730e141494f002.jpg',
    title: "'Dub-ki-Double' Comedy Event Pt. 1",
  },
  {
    thumb: 'https://static.wixstatic.com/media/91e833_418b56ca9b9647e2a40bc5aa0c5afb1f~mv2.jpg/v1/fill/w_600,h_450,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/img.jpg',
    full: 'https://static.wixstatic.com/media/91e833_418b56ca9b9647e2a40bc5aa0c5afb1f~mv2.jpg',
    title: 'Sankranthi Sambhrama 2020',
  },
  {
    thumb: 'https://static.wixstatic.com/media/91e833_b47ec738fc5a45b7858d1404f10726eb~mv2_d_4897_2906_s_4_2.jpg/v1/fill/w_600,h_450,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/img.jpg',
    full: 'https://static.wixstatic.com/media/91e833_b47ec738fc5a45b7858d1404f10726eb~mv2_d_4897_2906_s_4_2.jpg',
    title: 'Yugadi 2019 Pictures',
  },
  {
    thumb: 'https://static.wixstatic.com/media/91e833_25864af730df40309fea462b39fdfb90~mv2_d_4941_3294_s_4_2.jpg/v1/fill/w_600,h_450,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/img.jpg',
    full: 'https://static.wixstatic.com/media/91e833_25864af730df40309fea462b39fdfb90~mv2_d_4941_3294_s_4_2.jpg',
    title: 'Deepavali & Kannada Rajyothsava 2018',
  },
  {
    thumb: 'https://static.wixstatic.com/media/91e833_cca5d11faa744e158c3abef043b34268~mv2_d_5137_4281_s_4_2.jpg/v1/fill/w_600,h_450,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/img.jpg',
    full: 'https://static.wixstatic.com/media/91e833_cca5d11faa744e158c3abef043b34268~mv2_d_5137_4281_s_4_2.jpg',
    title: '45th Anniversary Extravaganza',
  },
];


export default function Gallery() {
  const [lightboxSrc, setLightboxSrc] = useState('');
  useScrollReveal();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const openLightbox = (src) => {
    setLightboxSrc(src);
    document.body.style.overflow = 'hidden';
  };
  const closeLightbox = () => {
    setLightboxSrc('');
    document.body.style.overflow = '';
  };

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') closeLightbox(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <>
      <div className="page-hero" style={{ padding: '8rem 2rem 3rem', textAlign: 'center', background: 'radial-gradient(ellipse at top, rgba(212,41,42,0.06) 0%, transparent 60%)' }}>
        <div className="section-tag" style={{ background: 'rgba(212,41,42,0.1)', color: 'var(--color-primary)' }}>Memories</div>
        <h1 className="section-title" style={{ marginTop: '0.75rem' }}>NKK <span className="accent">Gallery</span></h1>
        <p className="section-desc" style={{ maxWidth: '560px', margin: '1rem auto 0', color: 'var(--color-text-muted)' }}>
          Relive our most cherished community moments” from Ugadi to Rajyotsava and everything in between.
        </p>
      </div>

      <section style={{ padding: '0 2rem 6rem' }}>
        <div className="container">
          <div className="section-header reveal" style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <h2 className="section-title">Event <span className="accent">Highlights</span></h2>
            <p style={{ color: 'var(--color-text-muted)', marginTop: '0.5rem' }}>Click on any image to zoom in</p>
          </div>

          <div className="gallery-container">
            {GALLERY_ITEMS.map((item, i) => (
              <div
                key={item.full}
                className={`gallery-item reveal${i % 3 !== 0 ? ` reveal-delay-${(i % 3)}` : ''}`}
                onClick={() => openLightbox(item.full)}
                role="button"
                aria-label={`View ${item.title}`}
              >
                <img src={item.thumb} alt={item.title} loading="lazy" />
                <div className="gallery-overlay">
                  <div className="gallery-title">{item.title}</div>
                </div>
              </div>
            ))}
          </div>

          {/* External Photo Library Link */}
          <div className="ext-link-card reveal">
            <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}></div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: '1rem' }}>
              Full Photo Library <span className="gradient-text">NKK Photos 2025+</span>
            </h2>
            <p style={{ color: 'var(--color-text-muted)', maxWidth: '520px', margin: '0 auto 2rem', lineHeight: 1.8 }}>
              Browse hundreds of photos from all NKK events, celebrations, and community moments on our Google Photos site.
            </p>
            <a
              href="https://sites.google.com/view/nkkpictures/home"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              id="gallery-ext-btn"
            >
              Browse Full NKK Gallery
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxSrc && (
        <div className="lightbox open" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox} aria-label="Close">âœ•</button>
          <img src={lightboxSrc} alt="Full screen event photo" onClick={e => e.stopPropagation()} />
        </div>
      )}
    </>
  );
}

