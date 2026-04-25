import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

// Original NKK Logo from Wix CDN (Karnataka map logo)
const LOGO_URL = 'https://static.wixstatic.com/media/91e833_2908f930bf0c49f4a1977d4bbd67d0cc~mv2.jpg/v1/fill/w_135,h_132,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/NKK_Logo.jpg';

const NAV_ITEMS = [
  { to: '/',           label: 'Home',           end: true },
  { to: '/about',      label: 'About Us' },
  { to: '/events',     label: 'Events 2026' },
  { to: '/gallery',    label: 'Photos 2025+' },
  { to: '/sponsors',   label: 'Sponsors 2026' },
  { to: '/scholarship',label: 'Scholarship' },
  { to: '/contact',    label: 'Contact Us' },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [theme, setTheme] = useState(document.documentElement.getAttribute('data-theme') || 'dark');

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
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-inner">
          {/* NKK Karnataka Map Logo */}
          <NavLink to="/" className="nav-logo">
            <div className="nav-logo-icon" style={{ background: 'transparent', overflow: 'hidden' }}>
              <img src={LOGO_URL} alt="NKK Logo" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '50%' }} />
            </div>
            <div className="nav-logo-text">
              <span className="en">NKK</span>
              <span className="kn" style={{ fontSize: '0.72rem' }}>ನೃಪತುಂಗ ಕನ್ನಡ ಕೂಟ</span>
            </div>
          </NavLink>

          <div className="nav-links">
            {NAV_ITEMS.map(item => (
              <NavLink key={item.to} to={item.to} end={item.end} className={navLinkClass}>
                {item.label}
              </NavLink>
            ))}
            
            <button 
              onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
              style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--color-text)', borderRadius: '100px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 0.5rem', width: '38px', height: '38px', fontSize: '1.2rem', transition: '0.3s' }}
              title="Toggle Theme"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>

            <NavLink to="/membership" className="btn-nav">Join NKK →</NavLink>
          </div>

          <button
            className={`nav-hamburger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
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
          <NavLink to="/membership">✨ Join NKK</NavLink>
        </nav>
      )}
    </>
  );
}
