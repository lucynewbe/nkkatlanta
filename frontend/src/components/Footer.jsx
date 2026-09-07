import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);

  const subscribe = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    setStatus(res.ok ? 'ok' : 'err');
  };

  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="kn">ನೃಪತುಂಗ ಕನ್ನಡ ಕೂಟ</div>
            <div className="en">Nrupathunga Kannada Koota</div>
            <p>Preserving Karnataka's culture and language for the Kannada-speaking community of Greater Atlanta since 1973.</p>
            <span className="footer-badge">IRS 501(c)(3) Non-Profit</span>
            <form onSubmit={subscribe} className="newsletter-bar">
              <input className="form-input" type="email" required placeholder="Email for news" value={email} onChange={e => setEmail(e.target.value)} />
              <button className="btn btn-outline btn-sm" type="submit">Subscribe</button>
            </form>
            {status === 'ok' && <p style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>You are on the list.</p>}
            {status === 'err' && <p style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>Could not subscribe.</p>}
          </div>
          <div className="footer-col">
            <div className="footer-col-title">Organization</div>
            <ul>
              <li><NavLink to="/about">About Us</NavLink></li>
              <li><NavLink to="/team">NKK Team 2026</NavLink></li>
              <li><NavLink to="/about#journey">Our Journey</NavLink></li>
              <li><a href="https://www.atlantakannada.org/bylaws" target="_blank" rel="noopener noreferrer">Bylaws</a></li>
              <li><NavLink to="/gallery">Gallery</NavLink></li>
            </ul>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">Get Involved</div>
            <ul>
              <li><NavLink to="/membership">Membership</NavLink></li>
              <li><NavLink to="/donate">Donate</NavLink></li>
              <li><NavLink to="/news">News</NavLink></li>
              <li><NavLink to="/scholarship">Scholarship</NavLink></li>
            </ul>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">Contact</div>
            <ul>
              <li><NavLink to="/contact">Contact Us</NavLink></li>
              <li><a href="mailto:info@atlantakannada.org">info@atlantakannada.org</a></li>
              <li><a href="tel:4706452147">(470) 645-2147</a></li>
              <li><NavLink to="/admin/login" style={{opacity:0.4,fontSize:'0.8rem'}}>Admin ↗</NavLink></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} <span className="nonprofit">Nrupathunga Kannada Koota</span> · 11585 Jones Bridge Road, Ste 420 PMB1238, Johns Creek, GA 30022</p>
          <p><a href="https://www.facebook.com/NKKAtlanta" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary-2)' }}>📘 Facebook</a></p>
        </div>
      </div>
    </footer>
  );
}
