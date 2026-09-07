const express = require('express');
const router = express.Router();
const db = require('../db/database');
const auth = require('../middleware/authenticate');
const { requireRole } = require('../middleware/roles');

router.get('/', (req, res) => {
  res.json(db.prepare('SELECT * FROM hero_slides WHERE active = 1 ORDER BY sort_order, id').all());
});

router.get('/all', auth, (req, res) => {
  res.json(db.prepare('SELECT * FROM hero_slides ORDER BY sort_order, id').all());
});

router.post('/', auth, requireRole('editor'), (req, res) => {
  const { src, label, subtitle, sort_order } = req.body;
  if (!src) return res.status(400).json({ error: 'src is required' });
  const r = db.prepare('INSERT INTO hero_slides (src, label, subtitle, sort_order) VALUES (?,?,?,?)')
    .run(src, label || '', subtitle || '', sort_order || 0);
  res.status(201).json(db.prepare('SELECT * FROM hero_slides WHERE id = ?').get(r.lastInsertRowid));
});

router.put('/:id', auth, requireRole('editor'), (req, res) => {
  const { src, label, subtitle, sort_order, active } = req.body;
  db.prepare('UPDATE hero_slides SET src=?, label=?, subtitle=?, sort_order=?, active=? WHERE id=?')
    .run(src, label || '', subtitle || '', sort_order || 0, active !== undefined ? active : 1, req.params.id);
  res.json(db.prepare('SELECT * FROM hero_slides WHERE id = ?').get(req.params.id));
});

router.delete('/:id', auth, requireRole('editor'), (req, res) => {
  db.prepare('DELETE FROM hero_slides WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

module.exports = router;
