const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');
const path = require('path');

const DB_PATH = path.join(__dirname, 'nkk.db');
const db = new Database(DB_PATH);

db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// ─── Schema ───────────────────────────────────────────────────────────────────
db.exec(`
  CREATE TABLE IF NOT EXISTS events (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    title       TEXT    NOT NULL,
    title_kn    TEXT,
    month       TEXT,
    season      TEXT,
    date        TEXT,
    location    TEXT,
    register_url TEXT,
    image_url   TEXT,
    emoji       TEXT    DEFAULT '🎉',
    description TEXT,
    highlights  TEXT    DEFAULT '[]',
    active      INTEGER DEFAULT 1,
    created_at  TEXT    DEFAULT (datetime('now')),
    updated_at  TEXT    DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS team_members (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        TEXT    NOT NULL,
    role        TEXT    NOT NULL,
    category    TEXT    NOT NULL CHECK(category IN ('trustee','ec','bod')),
    bio         TEXT,
    image_url   TEXT,
    avatar_emoji TEXT   DEFAULT '👤',
    order_index INTEGER DEFAULT 0,
    active      INTEGER DEFAULT 1,
    created_at  TEXT    DEFAULT (datetime('now')),
    updated_at  TEXT    DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS sponsors (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        TEXT    NOT NULL,
    tier        TEXT    NOT NULL CHECK(tier IN ('diamond','gold','silver','general')),
    description TEXT,
    image_url   TEXT,
    website     TEXT,
    year        INTEGER DEFAULT 2026,
    active      INTEGER DEFAULT 1,
    created_at  TEXT    DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS contact_submissions (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name  TEXT,
    last_name   TEXT,
    email       TEXT    NOT NULL,
    subject     TEXT,
    message     TEXT,
    created_at  TEXT    DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS admin_users (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    username      TEXT    NOT NULL UNIQUE,
    password_hash TEXT    NOT NULL,
    created_at    TEXT    DEFAULT (datetime('now'))
  );
`);

// ─── Migrations (Safe column additions) ───────────────────────────────────────
const columns = [
  { table: 'events', name: 'date', type: 'TEXT' },
  { table: 'events', name: 'time_start', type: 'TEXT' },
  { table: 'events', name: 'time_end', type: 'TEXT' },
  { table: 'events', name: 'location', type: 'TEXT' },
  { table: 'events', name: 'register_url', type: 'TEXT' },
  { table: 'events', name: 'image_url', type: 'TEXT' },
  { table: 'events', name: 'is_upcoming', type: 'INTEGER DEFAULT 0' },
  { table: 'team_members', name: 'image_url', type: 'TEXT' },
  { table: 'team_members', name: 'avatar_emoji', type: 'TEXT DEFAULT "👤"' },
  { table: 'sponsors', name: 'image_url', type: 'TEXT' },
  { table: 'sponsors', name: 'description', type: 'TEXT' },
];

columns.forEach(col => {
  try { db.exec(`ALTER TABLE ${col.table} ADD COLUMN ${col.name} ${col.type}`); } catch(e) {}
});

// ─── Seed Data ────────────────────────────────────────────────────────────────
function seed() {
  const adminExists = db.prepare("SELECT id FROM admin_users WHERE username = 'admin'").get();
  if (!adminExists) {
    const hash = bcrypt.hashSync('nkk@admin2026', 10);
    db.prepare("INSERT INTO admin_users (username, password_hash) VALUES (?, ?)").run('admin', hash);
  }

  const evtCount = db.prepare("SELECT COUNT(*) as c FROM events").get().c;
  if (evtCount === 0) {
    const insertEvt = db.prepare(`
      INSERT INTO events (title, title_kn, month, season, date, location, register_url, emoji, description, highlights)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    [
      ['Ugadi Sadagara 2026', 'ಯುಗಾದಿ ಸದಾಗರೆ', 'April', 'Spring', 'April 11th 2026', 'West Forsyth High School, 4155 Drew Road, Cumming GA 30040', 'https://www.zeffy.com/en-US/ticketing/yugadi-2026-new-year', '🌸',
        'Ugadi is the Kannada New Year — the same auspicious day NKK was founded in 1973. Join us for a grand celebration with traditional food and cultural programs.',
        JSON.stringify(['📿 Panchanga Shravanam', '🌿 Bevu-Bella Ceremony', '💃 Classical Dance', '🍽️ Traditional Feast'])],
      ['Sankranti', 'ಸಂಕ್ರಾಂತಿ', 'January', 'Winter', 'January 2026', 'Atlanta', null, '🌾',
        "Sankranti marks the sun's transition into Capricorn and is one of the most important harvest festivals in Karnataka.",
        JSON.stringify(['🪁 Kite Flying', '🍚 Pongal', '🌺 Ellu-Bella Exchange'])],
    ].forEach(e => insertEvt.run(...e));
  }
}

seed();
module.exports = db;
