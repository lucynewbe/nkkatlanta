import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function AdminLogin() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [creds, setCreds] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const result = await login(creds.username, creds.password);
    if (result.success) {
      navigate('/admin');
    } else {
      setError(result.error || 'Login failed');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-bg)', padding: '2rem' }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ width: 70, height: 70, borderRadius: '50%', background: 'linear-gradient(135deg,#c8841a,#7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', margin: '0 auto 1rem', boxShadow: '0 0 30px rgba(200,132,26,0.4)' }}>🪔</div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.25rem' }}>NKK Admin</h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Nrupathunga Kannada Koota — Admin Portal</p>
        </div>

        <div className="glass-card" style={{ padding: '2.5rem' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', marginBottom: '0.5rem' }}>Sign In</h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginBottom: '2rem' }}>Enter your admin credentials to continue.</p>

          {error && <div className="alert alert-error" style={{ marginBottom: '1rem' }}>⚠️ {error}</div>}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Username</label>
              <input className="form-input" autoComplete="username" placeholder="admin" required
                value={creds.username} onChange={e => setCreds(c => ({ ...c, username: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input className="form-input" type="password" autoComplete="current-password" placeholder="••••••••" required
                value={creds.password} onChange={e => setCreds(c => ({ ...c, password: e.target.value }))} />
            </div>
            <button type="submit" className="btn btn-gold" style={{ justifyContent: 'center', marginTop: '0.5rem' }} disabled={loading}>
              {loading ? <><span className="loading-spinner" /> Signing in…</> : '🔐 Sign In'}
            </button>
          </form>

          <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(200,132,26,0.06)', borderRadius: '12px', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
            Default credentials — <strong style={{ color: 'var(--color-primary-2)' }}>admin / nkk@admin2026</strong><br />
            Change these in production!
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <a href="/" style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>← Back to Website</a>
        </div>
      </div>
    </div>
  );
}
