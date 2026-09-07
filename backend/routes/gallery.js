const express = require('express');
const router = express.Router();
const db = require('../db/database');
const auth = require('../middleware/authenticate');
const { requireRole } = require('../middleware/roles');

router.get('/', (req, res) => {
  const albums = db.prepare('SELECT * FROM gallery_albums WHERE active = 1 ORDER BY year DESC, id DESC').all();
  const photos = db.prepare('SELECT * FROM gallery_photos ORDER BY sort_order, id').all();
  const byAlbum = {};
  photos.forEach(p => {
    byAlbum[p.album_id] = byAlbum[p.album_id] || [];
    byAlbum[p.album_id].push(p);
  });
  res.json(albums.map(a => ({ ...a, photos: byAlbum[a.id] || [] })));
});

router.post('/albums', auth, requireRole('editor'), (req, res) => {
  const { title, description, cover_url, year } = req.body;
  if (!title) return res.status(400).json({ error: 'title is required' });
  const r = db.prepare('INSERT INTO gallery_albums (title, description, cover_url, year) VALUES (?,?,?,?)')
    .run(title, description || '', cover_url || '', year || null);
  res.status(201).json(db.prepare('SELECT * FROM gallery_albums WHERE id = ?').get(r.lastInsertRowid));
});

router.put('/albums/:id', auth, requireRole('editor'), (req, res) => {
  const { title, description, cover_url, year, active } = req.body;
  db.prepare('UPDATE gallery_albums SET title=?, description=?, cover_url=?, year=?, active=? WHERE id=?')
    .run(title, description || '', cover_url || '', year || null, active !== undefined ? active : 1, req.params.id);
  res.json(db.prepare('SELECT * FROM gallery_albums WHERE id = ?').get(req.params.id));
});

router.delete('/albums/:id', auth, requireRole('editor'), (req, res) => {
  db.prepare('DELETE FROM gallery_photos WHERE album_id = ?').run(req.params.id);
  db.prepare('DELETE FROM gallery_albums WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

router.post('/photos', auth, requireRole('editor'), (req, res) => {
  const { album_id, image_url, caption } = req.body;
  if (!album_id || !image_url) return res.status(400).json({ error: 'album_id and image_url required' });
  const r = db.prepare('INSERT INTO gallery_photos (album_id, image_url, caption) VALUES (?,?,?)')
    .run(album_id, image_url, caption || '');
  res.status(201).json(db.prepare('SELECT * FROM gallery_photos WHERE id = ?').get(r.lastInsertRowid));
});

router.delete('/photos/:id', auth, requireRole('editor'), (req, res) => {
  db.prepare('DELETE FROM gallery_photos WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

module.exports = router;
