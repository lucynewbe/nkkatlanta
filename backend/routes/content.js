const express = require('express');
const router = express.Router();
const db = require('../db/database');
const auth = require('../middleware/authenticate');
const { requireRole } = require('../middleware/roles');

router.get('/', (req, res) => {
  const rows = db.prepare('SELECT key, value FROM site_content').all();
  const map = {};
  rows.forEach(r => { map[r.key] = r.value; });
  res.json(map);
});

router.put('/', auth, requireRole('editor'), (req, res) => {
  const entries = req.body || {};
  const upsert = db.prepare('INSERT INTO site_content (key, value, updated_at) VALUES (?, ?, datetime(\'now\')) ON CONFLICT(key) DO UPDATE SET value=excluded.value, updated_at=excluded.updated_at');
  const tx = db.transaction((obj) => {
    Object.entries(obj).forEach(([k, v]) => upsert.run(k, String(v)));
  });
  tx(entries);
  const rows = db.prepare('SELECT key, value FROM site_content').all();
  const map = {};
  rows.forEach(r => { map[r.key] = r.value; });
  res.json(map);
});

module.exports = router;
