import { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useApi } from '../../hooks/useApi';

const EMPTY = { name: '', role: '', category: 'ec', bio: '', image_url: '', avatar_emoji: '👤', order_index: 0 };

function MemberModal({ member, onClose, onSave }) {
  const [form, setForm] = useState(member ? { ...member } : { ...EMPTY });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { post, put, upload } = useApi();
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const { url } = await upload('/api/upload', file);
      set('image_url', url);
    } catch (err) { alert(err.message); }
    finally { setUploading(false); }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const saved = member?.id
        ? await put(`/api/team/${member.id}`, form)
        : await post('/api/team', form);
      onSave(saved, !!member?.id);
    } catch (err) { alert(err.message); }
    finally { setSaving(false); }
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: '700px' }}>
        <h2 className="modal-title">{member?.id ? '✏️ Edit Member' : '➕ Add Team Member'}</h2>
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input className="form-input" required value={form.name} onChange={e => set('name', e.target.value)} placeholder="Dr. Subra Bhat" />
            </div>
            <div className="form-group">
              <label className="form-label">Role / Title</label>
              <input className="form-input" required value={form.role} onChange={e => set('role', e.target.value)} placeholder="Trustee & Former Chairman" />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Profile Image</label>
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              <div style={{ width: 100, height: 100, background: '#1a1425', borderRadius: '16px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
                {form.image_url ? (
                  <img src={form.image_url} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <span style={{ fontSize: '2.5rem' }}>{form.avatar_emoji}</span>
                )}
              </div>
              <div style={{ flex: 1 }}>
                <input className="form-input" value={form.image_url} onChange={e => set('image_url', e.target.value)} placeholder="https://... or upload photo" style={{ marginBottom: '0.75rem' }} />
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <label className="btn btn-outline btn-sm" style={{ cursor: 'pointer', margin: 0 }}>
                        {uploading ? '⌛ Uploading...' : '📁 Upload Photo'}
                        <input type="file" hidden accept="image/*" onChange={handleFileUpload} disabled={uploading} />
                    </label>
                    <input className="form-input" value={form.avatar_emoji} onChange={e => set('avatar_emoji', e.target.value)} style={{ width: 60, textAlign: 'center' }} title="Fallback Emoji" />
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Category</label>
              <select className="form-select" value={form.category} onChange={e => set('category', e.target.value)}>
                <option value="trustee">Trustee (Board)</option>
                <option value="ec">Executive Committee (EC)</option>
                <option value="bod">Board of Directors (BOD)</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Order (1 = first)</label>
              <input className="form-input" type="number" min={0} value={form.order_index} onChange={e => set('order_index', +e.target.value)} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
                Biography <span>(Expanded room)</span>
            </label>
            <textarea 
                className="form-input" 
                style={{ height: '240px', lineHeight: '1.6', padding: '1rem', resize: 'vertical' }}
                value={form.bio} 
                onChange={e => set('bio', e.target.value)} 
                placeholder="Write a detailed biography here. Focus on their contributions to NKK and professional background..." 
            />
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-outline btn-sm" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-gold btn-sm" disabled={saving || uploading}>
              {saving ? <><span className="loading-spinner" /> Saving…</> : '💾 Save Member'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AdminTeam() {
  const { get, del } = useApi();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [filter, setFilter] = useState('all');

  const refresh = () => {
    setLoading(true);
    get('/api/team').then(setMembers).catch(console.error).finally(() => setLoading(false));
  };

  useEffect(() => { refresh(); }, []);

  const handleSave = (saved, isEdit) => {
    if (isEdit) {
      setMembers(m => m.map(x => x.id === saved.id ? saved : x));
    } else {
      refresh();
    }
    setModal(null);
  };

  const handleDelete = async (id, name) => {
    if (!confirm(`Remove "${name}" from the team?`)) return;
    try {
        await del(`/api/team/${id}`);
        setMembers(m => m.filter(x => x.id !== id));
    } catch (err) { alert(err.message); }
  };

  const filtered = filter === 'all' ? members : members.filter(m => m.category === filter);

  return (
    <AdminLayout title="Team Members">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {['all', 'trustee', 'ec', 'bod'].map(f => (
            <button key={f} className={`btn btn-sm ${filter === f ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setFilter(f)} style={{ borderRadius: 'var(--radius-sm)', textTransform: 'capitalize' }}>
              {f === 'all' ? 'All' : f === 'trustee' ? '🏛️ Trustees' : f === 'ec' ? '⚙️ EC' : '🤝 BOD'}
            </button>
          ))}
        </div>
        <button className="btn btn-gold btn-sm" onClick={() => setModal('new')}>➕ Add Member</button>
      </div>

      <div className="admin-card">
        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}><div className="loading-spinner" style={{ width: 36, height: 36, margin: '0 auto' }} /></div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="admin-table">
                <thead>
                <tr><th>Name</th><th>Role</th><th>Category</th><th>Order</th><th>Actions</th></tr>
                </thead>
                <tbody>
                {filtered.map(m => (
                    <tr key={m.id}>
                    <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{ width: 32, height: 32, borderRadius: '4px', overflow: 'hidden', background: '#2d2438', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {m.image_url ? <img src={m.image_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : m.avatar_emoji}
                            </div>
                            <div style={{ fontWeight: 600 }}>{m.name}</div>
                        </div>
                    </td>
                    <td style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>{m.role}</td>
                    <td><span className={`admin-badge badge-${m.category}`}>{m.category}</span></td>
                    <td style={{ color: 'var(--color-text-muted)' }}>{m.order_index}</td>
                    <td>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button className="btn btn-outline btn-sm" onClick={() => setModal(m)}>✏️</button>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(m.id, m.name)}>🗑</button>
                        </div>
                    </td>
                    </tr>
                ))}
                {filtered.length === 0 && (
                    <tr><td colSpan={5} style={{ textAlign: 'center', color: 'var(--color-text-muted)', padding: '2rem' }}>No members found.</td></tr>
                )}
                </tbody>
            </table>
          </div>
        )}
      </div>

      {modal && (
        <MemberModal
          member={modal === 'new' ? null : modal}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}
    </AdminLayout>
  );
}
