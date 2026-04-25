const express = require('express');
const router = express.Router();
const db = require('../db/database');
const auth = require('../middleware/authenticate');

// POST /api/contact — public (form submissions)
router.post('/', (req, res) => {
  const { first_name, last_name, email, subject, message } = req.body;
  if (!email || !message) {
    return res.status(400).json({ error: 'email and message are required' });
  }
  const result = db.prepare(
    'INSERT INTO contact_submissions (first_name, last_name, email, subject, message) VALUES (?,?,?,?,?)'
  ).run(first_name || '', last_name || '', email, subject || '', message);
  res.status(201).json({ success: true, id: result.lastInsertRowid });
});

// GET /api/contact — admin only (view submissions)
router.get('/', auth, (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const offset = (page - 1) * limit;
  const total = db.prepare('SELECT COUNT(*) as c FROM contact_submissions').get().c;
  const rows = db.prepare(
    'SELECT * FROM contact_submissions ORDER BY created_at DESC LIMIT ? OFFSET ?'
  ).all(limit, offset);
  res.json({ total, page, limit, data: rows });
});

// DELETE /api/contact/:id — admin only
router.delete('/:id', auth, (req, res) => {
  db.prepare('DELETE FROM contact_submissions WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

module.exports = router;
