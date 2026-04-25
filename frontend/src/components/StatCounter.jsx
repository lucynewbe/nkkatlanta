import { useEffect, useRef } from 'react';

// Animated stat counter - SSR-safe with client-side check
export function StatCounter({ target, suffix = '' }) {
  const ref = useRef(null);

  // Only run animation on client-side
  useEffect(() => {
    // Ensure we're in client-side environment
    if (typeof window === 'undefined') return;

    const el = ref.current;
    if (!el) return;

    // Use a flag to ensure animation only starts once
    let started = false;

    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      if (started) return;
      started = true;
      obs.disconnect();
      const duration = 2000;
      const start = performance.now();
      const animate = (now) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.floor(eased * target) + suffix;
        if (t < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, suffix]);

  return <span ref={ref}>{'0' + suffix}</span>;
}

// Floating particle hero canvas - SSR-safe with client-side check
export function HeroParticles() {
  const containerRef = useRef(null);

  // Only run animation on client-side
  useEffect(() => {
    // Ensure we're in client-side environment
    if (typeof window === 'undefined') return;

    const container = containerRef.current;
    if (!container) return;

    const colors = ['#e6a020', '#a855f7', '#c8841a', '#7c3aed', '#f0eaf8'];
    const sizes = [4, 6, 8, 5, 10, 3];
    const particles = [];
    for (let i = 0; i < 28; i++) {
      const p = document.createElement('div');
      p.classList.add('particle');
      const size = sizes[Math.floor(Math.random() * sizes.length)];
      const color = colors[Math.floor(Math.random() * colors.length)];
      p.style.cssText = `width:${size}px;height:${size}px;left:${Math.random() * 100}%;background:${color};animation-duration:${8 + Math.random() * 15}s;animation-delay:${Math.random() * 12}s;box-shadow:0 0 ${size * 3}px ${color};`;
      container.appendChild(p);
      particles.push(p);
    }
    return () => particles.forEach(p => p.remove());
  }, []);

  return <div className="hero-particles" ref={containerRef} />;
}