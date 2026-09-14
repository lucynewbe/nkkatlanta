import { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useApi } from '../../hooks/useApi';

export default function AdminGallery() {
  const { get, post, del, upload } = useApi();
  const [albums, setAlbums] = useState([]);
  const [title, setTitle] = useState('');

  const load = () => get('/api/gallery').then(setAlbums);
  useEffect(() => { load(); }, []);

  return (
    <AdminLayout title="Gallery">
      <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
        <form onSubmit={async e => { e.preventDefault(); await post('/api/gallery/albums', { title }); setTitle(''); load(); }} className="newsletter-bar">
          <input className="form-input" placeholder="New album title" value={title} onChange={e => setTitle(e.target.value)} required />
          <button className="btn btn-gold btn-sm">Add album</button>
        </form>
      </div>
      {albums.map(a => (
        <div key={a.id} className="admin-card" style={{ marginBottom: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
            <h2>{a.title}</h2>
            <button className="btn btn-danger btn-sm" onClick={async () => { if (confirm('Delete album?')) { await del(`/api/gallery/albums/${a.id}`); load(); } }}>Delete</button>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', margin: '1rem 0' }}>
            {(a.photos || []).map(p => (
              <div key={p.id} style={{ width: 120 }}>
                <img src={p.image_url} alt="" style={{ width: 120, height: 90, objectFit: 'cover', borderRadius: 8 }} />
                <button className="btn btn-outline btn-sm" onClick={async () => { await del(`/api/gallery/photos/${p.id}`); load(); }}>Remove</button>
              </div>
            ))}
          </div>
          <input type="file" accept="image/*" onChange={async e => {
            const file = e.target.files[0];
            if (!file) return;
            const { url } = await upload('/api/upload', file);
            await post('/api/gallery/photos', { album_id: a.id, image_url: url, caption: file.name });
            load();
          }} />
        </div>
      ))}
    </AdminLayout>
  );
}
