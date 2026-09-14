const express = require('express');
const router = express.Router();
const db = require('../db/database');
const auth = require('../middleware/authenticate');
const { sendMail } = require('../lib/mail');

// GET /api/events — public
router.get('/', (req, res) => {
  const events = db.prepare('SELECT * FROM events WHERE active = 1 ORDER BY id').all();
  events.forEach(e => { e.highlights = JSON.parse(e.highlights || '[]'); });
  res.json(events);
});

router.get('/:id/ics', (req, res) => {
  const event = db.prepare('SELECT * FROM events WHERE id = ? AND active = 1').get(req.params.id);
  if (!event) return res.status(404).json({ error: 'Event not found' });
  const stamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//NKK Atlanta//Events//EN',
    'BEGIN:VEVENT',
    `UID:nkk-event-${event.id}@atlantakannada.org`,
    `DTSTAMP:${stamp}`,
    `SUMMARY:${(event.title || 'NKK Event').replace(/\n/g, ' ')}`,
    event.location ? `LOCATION:${event.location.replace(/\n/g, ' ')}` : '',
    event.description ? `DESCRIPTION:${String(event.description).replace(/\n/g, ' ')}` : '',
    'END:VEVENT',
    'END:VCALENDAR',
  ].filter(Boolean).join('\r\n');
  res.setHeader('Content-Type', 'text/calendar; charset=utf-8');
  res.setHeader('Content-Disposition', `attachment; filename="nkk-event-${event.id}.ics"`);
  res.send(ics);
});

router.post('/:id/rsvp', (req, res) => {
  const event = db.prepare('SELECT * FROM events WHERE id = ? AND active = 1').get(req.params.id);
  if (!event) return res.status(404).json({ error: 'Event not found' });
  const { name, email, guests } = req.body;
  if (!name || !email) return res.status(400).json({ error: 'name and email are required' });
  const r = db.prepare('INSERT INTO event_rsvps (event_id, name, email, guests) VALUES (?,?,?,?)')
    .run(event.id, name, email, Number(guests) || 1);
  sendMail({
    subject: `RSVP: ${event.title} — ${name}`,
    text: `${name} <${email}> guests=${guests || 1}`,
  });
  res.status(201).json({ success: true, id: r.lastInsertRowid });
});

router.get('/:id/rsvps', auth, (req, res) => {
  res.json(db.prepare('SELECT * FROM event_rsvps WHERE event_id = ? ORDER BY created_at DESC').all(req.params.id));
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
