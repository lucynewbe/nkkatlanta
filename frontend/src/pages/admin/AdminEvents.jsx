import { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useApi } from '../../hooks/useApi';

const EMPTY = { 
  title: '', 
  title_kn: '', 
  month: '', 
  season: '', 
  date: '', 
  time_start: '',
  time_end: '',
  location: '',
  register_url: '',
  emoji: '🎉', 
  description: '', 
  highlights: [], 
  image_url: '',
  is_upcoming: 0
};

function EventModal({ event, onClose, onSave }) {
  const [form, setForm] = useState(event ? { ...event, highlights: [...(event.highlights || [])] } : { ...EMPTY });
  const [tagInput, setTagInput] = useState('');
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

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !form.highlights.includes(t)) {
      setForm(f => ({ ...f, highlights: [...f.highlights, t] }));
    }
    setTagInput('');
  };

  const removeTag = (i) => setForm(f => ({ ...f, highlights: f.highlights.filter((_, idx) => idx !== i) }));

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const saved = event?.id
        ? await put(`/api/events/${event.id}`, form)
        : await post('/api/events', form);
      onSave(saved, !!event?.id);
    } catch (err) {
      alert(err.message);
    } finally { setSaving(false); }
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: '700px' }}>
        <h2 className="modal-title">{event?.id ? '✏️ Edit Event' : '➕ New Event'}</h2>
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '1rem', alignItems: 'end' }}>
            <div className="form-group">
              <label className="form-label">Title (English)</label>
              <input className="form-input" required value={form.title} onChange={e => set('title', e.target.value)} placeholder="e.g. Ugadi Sadagara" />
            </div>
            <div className="form-group">
              <label className="form-label">Emoji</label>
              <input className="form-input" value={form.emoji} onChange={e => set('emoji', e.target.value)} style={{ width: 70, textAlign: 'center', fontSize: '1.5rem' }} />
            </div>
            <div className="form-group">
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input type="checkbox" checked={!!form.is_upcoming} onChange={e => set('is_upcoming', e.target.checked ? 1 : 0)} style={{ width: '18px', height: '18px' }} />
                <span>⭐ Set as Upcoming Event</span>
              </label>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Event Banner / Image</label>
              <div style={{ width: '100%', height: 100, background: '#1a1425', borderRadius: '8px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '0.5rem' }}>
                {form.image_url ? (
                  <img src={form.image_url} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <span style={{ fontSize: '1.5rem' }}>{form.emoji}</span>
                )}
              </div>
              <label className="btn btn-outline btn-sm" style={{ cursor: 'pointer', margin: 0, width: '100%', textAlign: 'center' }}>
                    {uploading ? '⌛ Uploading...' : '📁 Upload Image'}
                    <input type="file" hidden accept="image/*" onChange={handleFileUpload} disabled={uploading} />
              </label>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Title (Kannada)</label>
                <input className="form-input" value={form.title_kn} onChange={e => set('title_kn', e.target.value)} placeholder="ಯುಗಾದಿ ಚಸದಾಗರೆ" />
              </div>
              <div className="form-group">
                <label className="form-label">Registration Link (Zeffy/Website)</label>
                <input className="form-input" type="url" value={form.register_url} onChange={e => set('register_url', e.target.value)} placeholder="https://zeffy.com/..." />
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Specific Date</label>
              <input className="form-input" type="date" value={form.date} onChange={e => set('date', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Start Time</label>
              <input className="form-input" type="time" value={form.time_start} onChange={e => set('time_start', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">End Time</label>
              <input className="form-input" type="time" value={form.time_end} onChange={e => set('time_end', e.target.value)} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Month</label>
              <select className="form-input" value={form.month} onChange={e => set('month', e.target.value)}>
                <option value="">Select Month</option>
                {['January','February','March','April','May','June','July','August','September','October','November','December'].map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Season</label>
              <select className="form-input" value={form.season} onChange={e => set('season', e.target.value)}>
                <option value="">Select Season</option>
                <option value="Spring">Spring</option>
                <option value="Summer">Summer</option>
                <option value="Autumn / Fall">Autumn / Fall</option>
                <option value="Winter">Winter</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Location / Address</label>
            <input className="form-input" value={form.location} onChange={e => set('location', e.target.value)} placeholder="West Forsyth High School, 4155 Drew Road..." />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea className="form-textarea" value={form.description} onChange={e => set('description', e.target.value)} rows={2} placeholder="Describe this event…" />
          </div>

          <div className="form-group">
            <label className="form-label">Highlights (press Enter to add)</label>
            <div className="tag-input-wrap">
              {form.highlights.map((h, i) => (
                <span className="tag-chip" key={i}>{h}<button type="button" onClick={() => removeTag(i)}>×</button></span>
              ))}
              <input
                className="tag-input"
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTag(); } }}
                placeholder="🪁 Kite Flying…"
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-outline btn-sm" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-gold btn-sm" disabled={saving || uploading}>
              {saving ? <><span className="loading-spinner" /> Saving…</> : '💾 Save Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AdminEvents() {
  const { get, del } = useApi();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);

  const fetchEvents = () => {
    setLoading(true);
    get('/api/events').then(setEvents).catch(console.error).finally(() => setLoading(false));
  };

  useEffect(() => { fetchEvents(); }, []);

  const handleSave = (saved, isEdit) => {
    fetchEvents(); // Refetch all events so unmarking works correctly from DB
    setModal(null);
  };

  const handleDelete = async (id, title) => {
    if (!confirm(`Delete "${title}"? This will hide it from the site.`)) return;
    try {
        await del(`/api/events/${id}`);
        setEvents(ev => ev.filter(e => e.id !== id));
    } catch (err) { alert(err.message); }
  };

  return (
    <AdminLayout title="Events">
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.5rem' }}>
        <button className="btn btn-gold btn-sm" onClick={() => setModal('new')}>➕ Add Event</button>
      </div>
      <div className="admin-card">
        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}><div className="loading-spinner" style={{ width: 36, height: 36, margin: '0 auto' }} /></div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="admin-table">
                <thead>
                <tr><th>Event</th><th>Date</th><th>Location</th><th>Registration</th><th>Actions</th></tr>
                </thead>
                <tbody>
                {events.map(ev => (
                    <tr key={ev.id}>
                    <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span style={{ fontSize: '1.5rem' }}>{ev.emoji}</span>
                        <div>
                            <div style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              {ev.title}
                              {ev.is_upcoming ? <span style={{ fontSize: '0.7rem', background: 'rgba(255,215,0,0.2)', color: '#ffd700', padding: '0.1rem 0.4rem', borderRadius: '4px', textTransform: 'uppercase' }}>Upcoming</span> : null}
                            </div>
                            <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>{ev.month} {ev.season && `· ${ev.season}`}</div>
                        </div>
                        </div>
                    </td>
                    <td style={{ color: 'var(--color-text-muted)' }}>{ev.date || '—'}</td>
                    <td style={{ color: 'var(--color-text-muted)', fontSize: '0.82rem', maxWidth: '200px' }}>{ev.location || '—'}</td>
                    <td>
                        {ev.register_url ? <a href={ev.register_url} target="_blank" rel="noopener noreferrer" className="admin-badge badge-platinum" style={{ textDecoration: 'none' }}>🔗 Link</a> : '—'}
                    </td>
                    <td>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button className="btn btn-outline btn-sm" onClick={() => setModal(ev)}>✏️</button>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(ev.id, ev.title)}>🗑</button>
                        </div>
                    </td>
                    </tr>
                ))}
                {events.length === 0 && (
                    <tr><td colSpan={5} style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-muted)' }}>No events found.</td></tr>
                )}
                </tbody>
            </table>
          </div>
        )}
      </div>

      {modal && (
        <EventModal
          event={modal === 'new' ? null : modal}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}
    </AdminLayout>
  );
}
