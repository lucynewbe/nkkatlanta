import { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useApi } from '../../hooks/useApi';

export default function AdminMessages() {
  const { get, del } = useApi();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [expanded, setExpanded] = useState(null);

  const fetchMessages = (p = 1) => {
    setLoading(true);
    get(`/api/contact?page=${p}&limit=20`)
      .then(data => {
        setMessages(data.data || []);
        setTotalPages(Math.ceil((data.total || 0) / 20));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchMessages(page); }, [page]);

  const handleDelete = async (id) => {
    if (!confirm('Delete this message?')) return;
    await del(`/api/contact/${id}`);
    setMessages(m => m.filter(x => x.id !== id));
  };

  return (
    <AdminLayout title="Contact Messages">
      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem' }}><div className="loading-spinner" style={{ width: 40, height: 40, margin: '0 auto' }} /></div>
      ) : (
        <>
          <div className="admin-card">
            {messages.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-muted)' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📭</div>
                <p>No messages yet.</p>
              </div>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr><th>From</th><th>Email</th><th>Subject</th><th>Date</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {messages.map(m => (
                    <>
                      <tr key={m.id} style={{ cursor: 'pointer' }} onClick={() => setExpanded(expanded === m.id ? null : m.id)}>
                        <td style={{ fontWeight: 600 }}>{m.first_name} {m.last_name}</td>
                        <td style={{ color: 'var(--color-text-muted)' }}>{m.email}</td>
                        <td style={{ color: 'var(--color-text-muted)' }}>{m.subject || '—'}</td>
                        <td style={{ color: 'var(--color-text-muted)', whiteSpace: 'nowrap', fontSize: '0.82rem' }}>
                          {new Date(m.created_at).toLocaleDateString()}
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <a href={`mailto:${m.email}`} className="btn btn-outline btn-sm">✉️ Reply</a>
                            <button className="btn btn-danger btn-sm" onClick={e => { e.stopPropagation(); handleDelete(m.id); }}>🗑</button>
                          </div>
                        </td>
                      </tr>
                      {expanded === m.id && (
                        <tr key={`${m.id}-detail`}>
                          <td colSpan={5} style={{ padding: '1rem 1.5rem', background: 'rgba(255,255,255,0.02)' }}>
                            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-primary-2)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Message</div>
                            <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7, fontSize: '0.9rem', whiteSpace: 'pre-wrap' }}>{m.message}</p>
                          </td>
                        </tr>
                      )}
                    </>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1.5rem' }}>
              <button className="btn btn-outline btn-sm" disabled={page <= 1} onClick={() => setPage(p => p - 1)}>← Prev</button>
              <span style={{ padding: '0.5rem 1rem', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Page {page} of {totalPages}</span>
              <button className="btn btn-outline btn-sm" disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>Next →</button>
            </div>
          )}
        </>
      )}
    </AdminLayout>
  );
}
