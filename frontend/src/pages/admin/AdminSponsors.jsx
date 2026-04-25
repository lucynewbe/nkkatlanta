import { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useApi } from '../../hooks/useApi';

const TIERS = ['diamond', 'gold', 'silver', 'general'];
const TIER_LABELS = { diamond: '💎 Diamond', gold: '🥇 Gold', silver: '🥈 Silver', general: '💙 General' };
const EMPTY = { name: '', tier: 'gold', year: 2026, website: '', image_url: '', description: '' };

function SponsorModal({ sponsor, onClose, onSave }) {
  const [form, setForm] = useState(sponsor ? { ...sponsor } : { ...EMPTY });
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
      const saved = sponsor?.id
        ? await put(`/api/sponsors/${sponsor.id}`, form)
        : await post('/api/sponsors', form);
      onSave(saved, !!sponsor?.id);
    } catch (err) { alert(err.message); }
    finally { setSaving(false); }
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: '600px' }}>
        <h2 className="modal-title">{sponsor?.id ? '✏️ Edit Sponsor' : '➕ Add Sponsor'}</h2>
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          <div className="form-group">
            <label className="form-label">Sponsor Name</label>
            <input className="form-input" required value={form.name} onChange={e => set('name', e.target.value)} placeholder="Acme Corporation" />
          </div>

          <div className="form-group">
            <label className="form-label">Logo / Image</label>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ width: 100, height: 60, background: '#1a1425', borderRadius: '8px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
                {form.image_url ? (
                  <img src={form.image_url} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '4px' }} />
                ) : (
                  <span style={{ fontSize: '1.2rem', opacity: 0.3 }}>LOGO</span>
                )}
              </div>
              <div style={{ flex: 1 }}>
                <input className="form-input" value={form.image_url} onChange={e => set('image_url', e.target.value)} placeholder="https://... or upload" style={{ marginBottom: '0.4rem' }} />
                <label className="btn btn-outline btn-sm" style={{ cursor: 'pointer', margin: 0, display: 'inline-block' }}>
                    {uploading ? '⌛ Uploading...' : '📁 Upload Logo'}
                    <input type="file" hidden accept="image/*" onChange={handleFileUpload} disabled={uploading} />
                </label>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Tier</label>
              <select className="form-select" value={form.tier} onChange={e => set('tier', e.target.value)}>
                {TIERS.map(t => <option key={t} value={t}>{TIER_LABELS[t]}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Year</label>
              <input className="form-input" type="number" min={2020} max={2099} value={form.year} onChange={e => set('year', +e.target.value)} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Website URL</label>
            <input className="form-input" type="url" value={form.website} onChange={e => set('website', e.target.value)} placeholder="https://example.com" />
          </div>

          <div className="form-group">
            <label className="form-label">Description / Subtitle</label>
            <textarea 
                className="form-input" 
                style={{ height: '100px', lineHeight: '1.6', padding: '0.75rem', resize: 'vertical' }}
                value={form.description} 
                onChange={e => set('description', e.target.value)} 
                placeholder="e.g. Expert Real Estate services for the Atlanta community..." 
            />
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-outline btn-sm" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-gold btn-sm" disabled={saving || uploading}>
              {saving ? <><span className="loading-spinner" /> Saving…</> : '💾 Save Sponsor'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AdminSponsors() {
  const { get, del } = useApi();
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [yearFilter, setYearFilter] = useState(new Date().getFullYear());

  useEffect(() => {
    get(`/api/sponsors?year=${yearFilter}`).then(setSponsors).catch(console.error).finally(() => setLoading(false));
  }, [yearFilter]);

  const handleSave = (saved, isEdit) => {
    setSponsors(s => isEdit ? s.map(x => x.id === saved.id ? saved : x) : [...s, saved]);
    setModal(null);
  };

  const handleDelete = async (id, name) => {
    if (!confirm(`Remove "${name}" from sponsors?`)) return;
    try {
        await del(`/api/sponsors/${id}`);
        setSponsors(s => s.filter(x => x.id !== id));
    } catch (err) { alert(err.message); }
  };

  return (
    <AdminLayout title="Sponsors">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <label className="form-label" style={{ margin: 0 }}>Year:</label>
          <select className="form-select" style={{ width: 'auto', padding: '0.45rem 0.85rem' }} value={yearFilter} onChange={e => setYearFilter(+e.target.value)}>
            {[2024, 2025, 2026, 2027].map(y => <option key={y}>{y}</option>)}
          </select>
        </div>
        <button className="btn btn-gold btn-sm" onClick={() => setModal('new')}>➕ Add Sponsor</button>
      </div>

      {/* Summary by tier */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        {TIERS.map(tier => {
          const count = sponsors.filter(s => s.tier === tier).length;
          return (
            <div key={tier} className="admin-card" style={{ padding: '1rem 1.5rem', flex: '1', minWidth: 120, textAlign: 'center' }}>
              <div style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>{TIER_LABELS[tier]}</div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', color: 'var(--color-primary-2)', fontWeight: 700 }}>{count}</div>
            </div>
          );
        })}
      </div>

      <div className="admin-card">
        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}><div className="loading-spinner" style={{ width: 36, height: 36, margin: '0 auto' }} /></div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="admin-table">
                <thead><tr><th>Logo</th><th>Name</th><th>Tier</th><th>Year</th><th>Link</th><th>Actions</th></tr></thead>
                <tbody>
                {sponsors.map(s => (
                    <tr key={s.id}>
                    <td>
                        <div style={{ width: 48, height: 32, background: '#2d2438', borderRadius: '4px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {s.image_url ? <img src={s.image_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} /> : '—'}
                        </div>
                    </td>
                    <td style={{ fontWeight: 600 }}>{s.name}</td>
                    <td><span className={`admin-badge badge-${s.tier}`}>{s.tier}</span></td>
                    <td style={{ color: 'var(--color-text-muted)' }}>{s.year}</td>
                    <td style={{ color: 'var(--color-text-muted)', fontSize: '0.82rem' }}>
                        {s.website ? <a href={s.website} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary-2)' }}>🔗</a> : '—'}
                    </td>
                    <td>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button className="btn btn-outline btn-sm" onClick={() => setModal(s)}>✏️</button>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(s.id, s.name)}>🗑</button>
                        </div>
                    </td>
                    </tr>
                ))}
                {sponsors.length === 0 && (
                    <tr><td colSpan={6} style={{ textAlign: 'center', color: 'var(--color-text-muted)', padding: '2rem' }}>No sponsors for {yearFilter}.</td></tr>
                )}
                </tbody>
            </table>
          </div>
        )}
      </div>

      {modal && (
        <SponsorModal
          sponsor={modal === 'new' ? null : modal}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}
    </AdminLayout>
  );
}
