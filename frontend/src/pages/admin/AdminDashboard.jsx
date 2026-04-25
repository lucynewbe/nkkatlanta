import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { useApi } from '../../hooks/useApi';

export default function AdminDashboard() {
  const { get } = useApi();
  const [stats, setStats] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      get('/api/admin/stats'),
      get('/api/contact?limit=5'),
    ]).then(([s, m]) => {
      setStats(s);
      setMessages(m.data || []);
    }).catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const CARDS = [
    { icon: '🎉', label: 'Active Events',   key: 'events',   link: '/admin/events' },
    { icon: '👥', label: 'Team Members',    key: 'team',     link: '/admin/team' },
    { icon: '🤝', label: 'Sponsors',        key: 'sponsors', link: '/admin/sponsors' },
    { icon: '✉️', label: 'Messages',        key: 'messages', link: '/admin/messages' },
  ];

  const QUICK = [
    { to: '/admin/events',   icon: '🎉', label: 'Add Event' },
    { to: '/admin/team',     icon: '👤', label: 'Add Team Member' },
    { to: '/admin/sponsors', icon: '🤝', label: 'Add Sponsor' },
  ];

  return (
    <AdminLayout title="Dashboard">
      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem' }}><div className="loading-spinner" style={{ width: 40, height: 40, margin: '0 auto' }} /></div>
      ) : (
        <>
          {/* Stats */}
          <div className="stat-cards-grid">
            {CARDS.map(c => (
              <Link to={c.link} key={c.key} style={{ textDecoration: 'none' }}>
                <div className="stat-card" style={{ cursor: 'pointer', transition: 'var(--transition)' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(200,132,26,0.3)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{c.icon}</div>
                  <div className="stat-card-number">{stats?.[c.key] ?? '—'}</div>
                  <div className="stat-card-label">{c.label}</div>
                </div>
              </Link>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="admin-card" style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', marginBottom: '1.5rem' }}>⚡ Quick Actions</h2>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {QUICK.map(q => (
                <Link to={q.to} key={q.to} className="btn btn-outline btn-sm" style={{ borderRadius: 'var(--radius-sm)' }}>
                  {q.icon} {q.label}
                </Link>
              ))}
              <Link to="/" className="btn btn-outline btn-sm" style={{ borderRadius: 'var(--radius-sm)' }}>
                🌐 View Live Site
              </Link>
            </div>
          </div>

          {/* Recent Messages */}
          <div className="admin-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem' }}>✉️ Recent Messages</h2>
              <Link to="/admin/messages" className="btn btn-outline btn-sm" style={{ borderRadius: 'var(--radius-sm)' }}>View All</Link>
            </div>
            {messages.length === 0 ? (
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>No messages yet.</p>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr><th>From</th><th>Email</th><th>Subject</th><th>Date</th></tr>
                </thead>
                <tbody>
                  {messages.map(m => (
                    <tr key={m.id}>
                      <td>{m.first_name} {m.last_name}</td>
                      <td style={{ color: 'var(--color-text-muted)' }}>{m.email}</td>
                      <td style={{ color: 'var(--color-text-muted)' }}>{m.subject || '—'}</td>
                      <td style={{ color: 'var(--color-text-muted)', whiteSpace: 'nowrap', fontSize: '0.82rem' }}>
                        {new Date(m.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </AdminLayout>
  );
}
