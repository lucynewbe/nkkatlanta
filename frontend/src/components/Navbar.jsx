import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const LOGO_URL = '/assets/nkk-logo.jpg';
const LOGO_FALLBACK = 'https://static.wixstatic.com/media/91e833_2908f930bf0c49f4a1977d4bbd67d0cc~mv2.jpg';

const NAV_ITEMS = [
  { to: '/',            label: 'Home', end: true },
  { to: '/about',       label: 'About' },
  { to: '/events',      label: 'Events' },
  { to: '/gallery',     label: 'Gallery' },
  { to: '/news',        label: 'News' },
  { to: '/sponsors',    label: 'Sponsors' },
  { to: '/scholarship', label: 'Scholarship' },
  { to: '/donate',      label: 'Donate' },
  { to: '/contact',     label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(document.documentElement.getAttribute('data-theme') || 'dark');
  const [logoSrc, setLogoSrc] = useState(LOGO_URL);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinkClass = ({ isActive }) => isActive ? 'active' : '';

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-inner">
          <NavLink to="/" className="nav-logo">
            <div className="nav-logo-icon" style={{ background: 'transparent', overflow: 'hidden' }}>
              <img
                src={logoSrc}
                alt="NKK Atlanta logo"
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                onError={() => setLogoSrc(LOGO_FALLBACK)}
              />
            </div>
            <div className="nav-logo-text">
              <span className="en">NKK</span>
              <span className="kn">ನೃಪತುಂಗ ಕನ್ನಡ ಕೂಟ</span>
            </div>
          </NavLink>

          <div className="nav-links">
            {NAV_ITEMS.map(item => (
              <NavLink key={item.to} to={item.to} end={item.end} className={navLinkClass}>
                {item.label}
              </NavLink>
            ))}
            <button
              type="button"
              className="theme-toggle"
              onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle color theme"
              style={{ background: 'transparent', border: '1px solid rgba(230,160,32,0.35)', color: 'var(--color-text)', borderRadius: '100px', cursor: 'pointer', width: 38, height: 38, margin: '0 0.4rem' }}
            >
              {theme === 'dark' ? '☀' : '☾'}
            </button>
            <NavLink to="/membership" className="btn-nav">Join NKK</NavLink>
          </div>

          <button
            className={`nav-hamburger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <nav className="nav-mobile open" onClick={() => setMenuOpen(false)}>
          {NAV_ITEMS.map(item => (
            <NavLink key={item.to} to={item.to} end={item.end}>{item.label}</NavLink>
          ))}
          <NavLink to="/membership">Join NKK</NavLink>
        </nav>
      )}
    </>
  );
}
