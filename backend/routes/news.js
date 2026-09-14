const express = require('express');
const router = express.Router();
const db = require('../db/database');
const auth = require('../middleware/authenticate');
const { requireRole } = require('../middleware/roles');

router.get('/', (req, res) => {
  const posts = db.prepare('SELECT * FROM news_posts WHERE published = 1 ORDER BY created_at DESC').all();
  res.json(posts);
});

router.get('/all', auth, (req, res) => {
  res.json(db.prepare('SELECT * FROM news_posts ORDER BY created_at DESC').all());
});

router.post('/', auth, requireRole('editor'), (req, res) => {
  const { title, body, image_url, published } = req.body;
  if (!title) return res.status(400).json({ error: 'title is required' });
  const r = db.prepare('INSERT INTO news_posts (title, body, image_url, published) VALUES (?,?,?,?)')
    .run(title, body || '', image_url || '', published !== undefined ? published : 1);
  res.status(201).json(db.prepare('SELECT * FROM news_posts WHERE id = ?').get(r.lastInsertRowid));
});

router.put('/:id', auth, requireRole('editor'), (req, res) => {
  const { title, body, image_url, published } = req.body;
  db.prepare('UPDATE news_posts SET title=?, body=?, image_url=?, published=?, updated_at=datetime(\'now\') WHERE id=?')
    .run(title, body || '', image_url || '', published !== undefined ? published : 1, req.params.id);
  res.json(db.prepare('SELECT * FROM news_posts WHERE id = ?').get(req.params.id));
});

router.delete('/:id', auth, requireRole('editor'), (req, res) => {
  db.prepare('DELETE FROM news_posts WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

module.exports = router;
