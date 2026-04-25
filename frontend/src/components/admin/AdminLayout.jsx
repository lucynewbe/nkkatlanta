import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { to: '/admin',          icon: '📊', label: 'Dashboard',   end: true },
  { to: '/admin/events',   icon: '🎉', label: 'Events' },
  { to: '/admin/team',     icon: '👥', label: 'Team Members' },
  { to: '/admin/sponsors', icon: '🤝', label: 'Sponsors' },
  { to: '/admin/messages', icon: '✉️', label: 'Messages' },
];

export default function AdminLayout({ children, title }) {
  const { username, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/admin/login'); };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-logo">
          <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🪔</div>
          <div className="en">NKK Admin</div>
          <span className="tag">ನೃಪತುಂಗ ಕನ್ನಡ ಕೂಟ</span>
        </div>
        <nav className="admin-nav">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              <span className="admin-nav-icon">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div style={{ padding: '0 0.75rem', marginTop: 'auto' }}>
          <div style={{ padding: '1rem', borderTop: '1px solid rgba(255,255,255,0.06)', marginBottom: '0.75rem' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>Logged in as</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-primary-2)' }}>@{username}</div>
          </div>
          <button onClick={handleLogout} className="btn btn-outline btn-sm" style={{ width: '100%', justifyContent: 'center', borderRadius: 'var(--radius-sm)' }}>
            🚪 Log Out
          </button>
          <NavLink to="/" style={{ display: 'block', textAlign: 'center', marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--color-text-muted)', padding: '0.5rem' }}>
            ← Back to Website
          </NavLink>
        </div>
      </aside>

      <main className="admin-main">
        <div className="admin-header">
          <h1 className="admin-title">{title}</h1>
        </div>
        {children}
      </main>
    </div>
  );
}
