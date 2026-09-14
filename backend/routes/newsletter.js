const express = require('express');
const router = express.Router();
const db = require('../db/database');
const auth = require('../middleware/authenticate');
const { sendMail } = require('../lib/mail');

router.post('/', (req, res) => {
  const email = (req.body.email || '').trim().toLowerCase();
  if (!email || !email.includes('@')) return res.status(400).json({ error: 'Valid email required' });
  try {
    db.prepare('INSERT INTO newsletter_signups (email) VALUES (?)').run(email);
  } catch {
    return res.status(200).json({ success: true, already: true });
  }
  sendMail({ subject: 'NKK newsletter signup', text: email });
  res.status(201).json({ success: true });
});

router.get('/', auth, (req, res) => {
  res.json(db.prepare('SELECT * FROM newsletter_signups ORDER BY created_at DESC').all());
});

module.exports = router;
