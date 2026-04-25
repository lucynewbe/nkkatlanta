const express = require('express');
const router = express.Router();
const db = require('../db/database');
const auth = require('../middleware/authenticate');

const VALID_CATEGORIES = ['trustee', 'ec', 'bod'];

// GET /api/team — public, grouped by category
router.get('/', (req, res) => {
  const members = db.prepare(
    'SELECT * FROM team_members WHERE active = 1 ORDER BY category, order_index'
  ).all();
  res.json(members);
});

// GET /api/team/:id — public
router.get('/:id', (req, res) => {
  const member = db.prepare('SELECT * FROM team_members WHERE id = ?').get(req.params.id);
  if (!member) return res.status(404).json({ error: 'Member not found' });
  res.json(member);
});

// POST /api/team — admin only
router.post('/', auth, (req, res) => {
  const { name, role, category, bio, image_url, avatar_emoji, order_index } = req.body;
  if (!name || !role || !category) {
    return res.status(400).json({ error: 'name, role, and category are required' });
  }
  if (!VALID_CATEGORIES.includes(category)) {
    return res.status(400).json({ error: `category must be one of: ${VALID_CATEGORIES.join(', ')}` });
  }
  const result = db.prepare(`
    INSERT INTO team_members (name, role, category, bio, image_url, avatar_emoji, order_index)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(name, role, category, bio || '', image_url || null, avatar_emoji || '👤', order_index || 0);
  const created = db.prepare('SELECT * FROM team_members WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(created);
});

// PUT /api/team/:id — admin only
router.put('/:id', auth, (req, res) => {
  const { name, role, category, bio, image_url, avatar_emoji, order_index, active } = req.body;
  const existing = db.prepare('SELECT id FROM team_members WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'Member not found' });
  if (category && !VALID_CATEGORIES.includes(category)) {
    return res.status(400).json({ error: `category must be one of: ${VALID_CATEGORIES.join(', ')}` });
  }
  db.prepare(`
    UPDATE team_members
    SET name=?, role=?, category=?, bio=?, image_url=?, avatar_emoji=?,
        order_index=?, active=?, updated_at=datetime('now')
    WHERE id=?
  `).run(name, role, category, bio || '', image_url || null,
    avatar_emoji || '👤', order_index || 0,
    active !== undefined ? active : 1, req.params.id);
  const updated = db.prepare('SELECT * FROM team_members WHERE id = ?').get(req.params.id);
  res.json(updated);
});

// DELETE /api/team/:id — admin only (soft delete)
router.delete('/:id', auth, (req, res) => {
  const existing = db.prepare('SELECT id FROM team_members WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'Member not found' });
  db.prepare("UPDATE team_members SET active=0, updated_at=datetime('now') WHERE id=?").run(req.params.id);
  res.json({ success: true });
});

module.exports = router;
