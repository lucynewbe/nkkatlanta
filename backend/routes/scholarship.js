const express = require('express');
const router = express.Router();
const db = require('../db/database');
const auth = require('../middleware/authenticate');
const { requireRole } = require('../middleware/roles');
const { sendMail } = require('../lib/mail');

router.post('/', (req, res) => {
  const { student_name, email, phone, school, essay } = req.body;
  if (!student_name || !email || !essay) {
    return res.status(400).json({ error: 'student_name, email, and essay are required' });
  }
  const r = db.prepare(
    'INSERT INTO scholarship_applications (student_name, email, phone, school, essay) VALUES (?,?,?,?,?)'
  ).run(student_name, email, phone || '', school || '', essay);
  sendMail({
    subject: `Scholarship application: ${student_name}`,
    text: `${student_name}\n${email}\n${school || ''}\n\n${essay}`,
  });
  res.status(201).json({ success: true, id: r.lastInsertRowid });
});

router.get('/', auth, (req, res) => {
  res.json(db.prepare('SELECT * FROM scholarship_applications ORDER BY created_at DESC').all());
});

router.put('/:id', auth, requireRole('editor'), (req, res) => {
  db.prepare('UPDATE scholarship_applications SET status = ? WHERE id = ?').run(req.body.status || 'new', req.params.id);
  res.json(db.prepare('SELECT * FROM scholarship_applications WHERE id = ?').get(req.params.id));
});

module.exports = router;
