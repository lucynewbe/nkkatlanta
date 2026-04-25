require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;

// ─── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.FRONTEND_URL || ['http://localhost:5173', 'http://localhost:3000'],
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use('/api/auth',    require('./routes/auth'));
app.use('/api/events',  require('./routes/events'));
app.use('/api/team',    require('./routes/team'));
app.use('/api/sponsors',require('./routes/sponsors'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/upload',  require('./routes/uploads'));

// ─── Health check ─────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// ─── Admin stats ──────────────────────────────────────────────────────────────
const auth = require('./middleware/authenticate');
const db   = require('./db/database');

app.get('/api/admin/stats', auth, (req, res) => {
  try {
    res.json({
      events:    db.prepare("SELECT COUNT(*) as c FROM events WHERE active=1").get().c,
      team:      db.prepare("SELECT COUNT(*) as c FROM team_members WHERE active=1").get().c,
      sponsors:  db.prepare("SELECT COUNT(*) as c FROM sponsors WHERE active=1").get().c,
      messages:  db.prepare("SELECT COUNT(*) as c FROM contact_submissions").get().c,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── Production: Serve Frontend ───────────────────────────────────────────────
if (process.env.NODE_ENV === 'production') {
  const frontendDist = path.join(__dirname, '../frontend/dist');
  app.use(express.static(frontendDist));
  
  // SPA Fallback: Catch any non-API request and serve index.html
  app.use((req, res, next) => {
    // Let API routes fall through to the actual 404 handler
    if (req.method !== 'GET' || req.path.startsWith('/api')) return next();
    res.sendFile(path.join(frontendDist, 'index.html'));
  });
}

// ─── 404 fallback ─────────────────────────────────────────────────────────────
app.use((req, res) => res.status(404).json({ error: 'Route not found' }));

// ─── Error handler ────────────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message || 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`🚀 NKK Backend running at http://localhost:${PORT}`);
});
