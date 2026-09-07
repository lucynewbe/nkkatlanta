import { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useApi } from '../../hooks/useApi';

export default function AdminContent() {
  const { get, put } = useApi();
  const [form, setForm] = useState({});
  const [saved, setSaved] = useState(false);

  useEffect(() => { get('/api/content').then(setForm); }, []);

  return (
    <AdminLayout title="Site content">
      <div className="admin-card">
        <form onSubmit={async e => { e.preventDefault(); await put('/api/content', form); setSaved(true); }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {['donate_url', 'membership_url', 'photos_library_url', 'about_intro'].map(key => (
            <div className="form-group" key={key}>
              <label className="form-label">{key}</label>
              {key === 'about_intro'
                ? <textarea className="form-textarea" value={form[key] || ''} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} />
                : <input className="form-input" value={form[key] || ''} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} />}
            </div>
          ))}
          <button className="btn btn-gold" style={{ alignSelf: 'flex-start' }}>Save</button>
          {saved && <p>Saved.</p>}
        </form>
      </div>
    </AdminLayout>
  );
}
