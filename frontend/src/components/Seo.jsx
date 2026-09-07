import { useEffect } from 'react';

export default function Seo({ title, description }) {
  useEffect(() => {
    const full = title ? `${title} | NKK Atlanta` : 'NKK Atlanta | Nrupathunga Kannada Koota';
    document.title = full;
    const meta = document.querySelector('meta[name="description"]');
    if (meta && description) meta.setAttribute('content', description);
    let og = document.querySelector('meta[property="og:title"]');
    if (!og) {
      og = document.createElement('meta');
      og.setAttribute('property', 'og:title');
      document.head.appendChild(og);
    }
    og.setAttribute('content', full);
  }, [title, description]);
  return null;
}
