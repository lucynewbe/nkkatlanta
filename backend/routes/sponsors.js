const express = require('express');
const router = express.Router();
const db = require('../db/database');
const auth = require('../middleware/authenticate');

const VALID_TIERS = ['diamond', 'gold', 'silver', 'general'];

// GET /api/sponsors?year=2026 — public
router.get('/', (req, res) => {
  const year = req.query.year || 2026;
  const sponsors = db.prepare(
    `SELECT * FROM sponsors WHERE active = 1 AND year = ?
     ORDER BY CASE tier
       WHEN 'diamond' THEN 1
       WHEN 'gold'    THEN 2
       WHEN 'silver'  THEN 3
       ELSE 4
     END, id`
  ).all(year);
  res.json(sponsors);
});

// POST /api/sponsors — admin only
router.post('/', auth, (req, res) => {
  const { name, tier, description, image_url, website, year } = req.body;
  if (!name || !tier) return res.status(400).json({ error: 'name and tier are required' });
  if (!VALID_TIERS.includes(tier)) {
    return res.status(400).json({ error: `tier must be one of: ${VALID_TIERS.join(', ')}` });
  }
  const result = db.prepare(
    'INSERT INTO sponsors (name, tier, description, image_url, website, year) VALUES (?, ?, ?, ?, ?, ?)'
  ).run(name, tier, description || '', image_url || null, website || '', year || 2026);
  const created = db.prepare('SELECT * FROM sponsors WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(created);
});

// PUT /api/sponsors/:id — admin only
router.put('/:id', auth, (req, res) => {
  const { name, tier, description, image_url, website, year, active } = req.body;
  const existing = db.prepare('SELECT id FROM sponsors WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'Sponsor not found' });
  if (tier && !VALID_TIERS.includes(tier)) {
    return res.status(400).json({ error: `tier must be one of: ${VALID_TIERS.join(', ')}` });
  }
  db.prepare(
    'UPDATE sponsors SET name=?, tier=?, description=?, image_url=?, website=?, year=?, active=? WHERE id=?'
  ).run(name, tier, description || '', image_url || null, website || '',
    year || 2026, active !== undefined ? active : 1, req.params.id);
  res.json(db.prepare('SELECT * FROM sponsors WHERE id = ?').get(req.params.id));
});

// DELETE /api/sponsors/:id — admin only (soft delete)
router.delete('/:id', auth, (req, res) => {
  const existing = db.prepare('SELECT id FROM sponsors WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'Sponsor not found' });
  db.prepare('UPDATE sponsors SET active=0 WHERE id=?').run(req.params.id);
  res.json({ success: true });
});

module.exports = router;
