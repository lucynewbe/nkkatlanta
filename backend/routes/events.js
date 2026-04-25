const express = require('express');
const router = express.Router();
const db = require('../db/database');
const auth = require('../middleware/authenticate');

// GET /api/events — public
router.get('/', (req, res) => {
  const events = db.prepare('SELECT * FROM events WHERE active = 1 ORDER BY id').all();
  events.forEach(e => { e.highlights = JSON.parse(e.highlights || '[]'); });
  res.json(events);
});

// GET /api/events/:id — public
router.get('/:id', (req, res) => {
  const event = db.prepare('SELECT * FROM events WHERE id = ?').get(req.params.id);
  if (!event) return res.status(404).json({ error: 'Event not found' });
  event.highlights = JSON.parse(event.highlights || '[]');
  res.json(event);
});

// POST /api/events — admin only
router.post('/', auth, (req, res) => {
  const { title, title_kn, month, season, emoji, description, highlights, date, time_start, time_end, location, register_url, image_url, is_upcoming } = req.body;
  if (!title) return res.status(400).json({ error: 'title is required' });

  // If this one is marked upcoming, unmark all others
  if (is_upcoming) {
    db.prepare('UPDATE events SET is_upcoming = 0').run();
  }

  const stmt = db.prepare(`
    INSERT INTO events (title, title_kn, month, season, emoji, description, highlights, date, time_start, time_end, location, register_url, image_url, is_upcoming)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const result = stmt.run(
    title, title_kn || '', month || '', season || '', emoji || '🎉',
    description || '', JSON.stringify(highlights || []),
    date || '', time_start || '', time_end || '', location || '', register_url || '', image_url || '', is_upcoming ? 1 : 0
  );
  const created = db.prepare('SELECT * FROM events WHERE id = ?').get(result.lastInsertRowid);
  created.highlights = JSON.parse(created.highlights);
  res.status(201).json(created);
});

// PUT /api/events/:id — admin only
router.put('/:id', auth, (req, res) => {
  const { title, title_kn, month, season, emoji, description, highlights, active, date, time_start, time_end, location, register_url, image_url, is_upcoming } = req.body;
  const existing = db.prepare('SELECT id FROM events WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'Event not found' });

  // If this one is marked upcoming, unmark all others
  if (is_upcoming) {
    db.prepare('UPDATE events SET is_upcoming = 0').run();
  }

  db.prepare(`
    UPDATE events SET title=?, title_kn=?, month=?, season=?, emoji=?, description=?,
    highlights=?, active=?, date=?, time_start=?, time_end=?, location=?, register_url=?, image_url=?, is_upcoming=?, updated_at=datetime('now') WHERE id=?
  `).run(
    title, title_kn || '', month || '', season || '', emoji || '🎉',
    description || '', JSON.stringify(highlights || []),
    active !== undefined ? active : 1, 
    date || '', time_start || '', time_end || '', location || '', register_url || '', image_url || '', is_upcoming ? 1 : 0, 
    req.params.id
  );
  const updated = db.prepare('SELECT * FROM events WHERE id = ?').get(req.params.id);
  updated.highlights = JSON.parse(updated.highlights);
  res.json(updated);
});

// DELETE /api/events/:id — admin only (soft delete)
router.delete('/:id', auth, (req, res) => {
  const existing = db.prepare('SELECT id FROM events WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'Event not found' });
  db.prepare("UPDATE events SET active=0, updated_at=datetime('now') WHERE id=?").run(req.params.id);
  res.json({ success: true });
});

module.exports = router;
