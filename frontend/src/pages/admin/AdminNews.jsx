import { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useApi } from '../../hooks/useApi';

export default function AdminNews() {
  const { get, post, del } = useApi();
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({ title: '', body: '' });

  const load = () => get('/api/news/all').then(setPosts);
  useEffect(() => { load(); }, []);

  return (
    <AdminLayout title="News">
      <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
        <form onSubmit={async e => { e.preventDefault(); await post('/api/news', form); setForm({ title: '', body: '' }); load(); }} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <input className="form-input" placeholder="Title" required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
          <textarea className="form-textarea" placeholder="Body" value={form.body} onChange={e => setForm(f => ({ ...f, body: e.target.value }))} />
          <button className="btn btn-gold btn-sm" style={{ alignSelf: 'flex-start' }}>Publish</button>
        </form>
      </div>
      <div className="admin-card">
        {posts.map(p => (
          <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', padding: '0.75rem 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div>
              <strong>{p.title}</strong>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>{p.body}</p>
            </div>
            <button className="btn btn-danger btn-sm" onClick={async () => { await del(`/api/news/${p.id}`); load(); }}>Delete</button>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
