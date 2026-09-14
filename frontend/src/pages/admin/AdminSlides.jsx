import { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useApi } from '../../hooks/useApi';

export default function AdminSlides() {
  const { get, post, del, upload } = useApi();
  const [slides, setSlides] = useState([]);
  const [form, setForm] = useState({ src: '', label: '', subtitle: '' });

  const load = () => get('/api/slides/all').then(setSlides);
  useEffect(() => { load(); }, []);

  return (
    <AdminLayout title="Hero slides">
      <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
        <form onSubmit={async e => { e.preventDefault(); await post('/api/slides', form); setForm({ src: '', label: '', subtitle: '' }); load(); }} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <input className="form-input" placeholder="Image URL or upload below" required value={form.src} onChange={e => setForm(f => ({ ...f, src: e.target.value }))} />
          <input type="file" accept="image/*" onChange={async e => {
            const file = e.target.files[0];
            if (!file) return;
            const { url } = await upload('/api/upload', file);
            setForm(f => ({ ...f, src: url }));
          }} />
          <input className="form-input" placeholder="Label" value={form.label} onChange={e => setForm(f => ({ ...f, label: e.target.value }))} />
          <input className="form-input" placeholder="Subtitle" value={form.subtitle} onChange={e => setForm(f => ({ ...f, subtitle: e.target.value }))} />
          <button className="btn btn-gold btn-sm" style={{ alignSelf: 'flex-start' }}>Add slide</button>
        </form>
      </div>
      {slides.map(s => (
        <div key={s.id} className="admin-card" style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.75rem' }}>
          <img src={s.src} alt="" style={{ width: 120, height: 72, objectFit: 'cover', borderRadius: 8 }} />
          <div style={{ flex: 1 }}><strong>{s.label}</strong><p style={{ color: 'var(--color-text-muted)' }}>{s.subtitle}</p></div>
          <button className="btn btn-danger btn-sm" onClick={async () => { await del(`/api/slides/${s.id}`); load(); }}>Delete</button>
        </div>
      ))}
    </AdminLayout>
  );
}
