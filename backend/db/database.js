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

  const teamCount = db.prepare("SELECT COUNT(*) as c FROM team_members").get().c;
  if (teamCount === 0) {
    const insertTeam = db.prepare(`INSERT INTO team_members (name, role, category, bio, image_url, avatar_emoji) VALUES (?, ?, ?, ?, ?, ?)`);
    [
      ['Dr. Subra Bhat', 'Trustee', 'trustee', 'Dr. Bhat is board-certified in Internal Medicine. He served as chairman of Atlanta Kannada Koota.', '/assets/Subra.png', '🧔‍♂️'],
      ['Dr. Anu Bhat', 'Trustee', 'trustee', 'Dr Anu Bhat is an award-winning Rheumatologist at Emory University in Atlanta.', '/assets/Dr.Anu.jpg', '👩‍⚕️'],
      ['Ramesh Ugrappa', 'Chairman', 'bod', 'Leading the 2026 Board of Directors.', null, '👨‍💼'],
      ['Ramesh Venkatesh', 'President', 'ec', 'President of NKK 2026. Moved to Atlanta in 2018.', null, '👨‍💼'],
      ['Sudeep Hebbar', 'BoD', 'bod', 'Software Architect by profession and an outdoor/music enthusiast from Udupi district.', '/assets/Sudeep.jpg', '👨‍💻'],
      ['Kavitha', 'Secretary', 'ec', 'Cloud Data Engineer with 15+ years experience. Featured on Times Square as Top 100 Women in Tech.', null, '👩‍💼'],
      ['Chaitra', 'Executive Committee', 'ec', 'Regional Program Manager for SEWA Internationals and Kannada teacher at Marietta Kannada Shaale.', null, '👩‍🏫'],
      ['Srinivas Yelwal', 'VP of Public Relations', 'ec', 'Supporting NKK PR initiatives.', null, '🗣️'],
      ['Prakash Ramachandraiah', 'BoD', 'bod', 'Key role in directing Kannada literary dramas and co-chair of AKKA 2012 Sammelana.', null, '🎭'],
      ['Sharathbabu Krishnarao', 'Treasurer', 'ec', 'Treasurer for 2026. Volunteered heavily in AKKA 2012.', '/assets/image.png', '📊'],
      ['Anjana Rao', 'BoD', 'bod', 'Product management director residing in Duluth.', null, '👩‍💼'],
      ['Keshava Prasad', 'VP Administration/Ops', 'ec', 'IT Architect residing in Alpharetta for the past 8 years.', '/assets/Keshava_photo.jpg', '🖥️'],
      ['SantoshKumar Pajimbila', 'BoD', 'bod', 'NKK 2026 Board of Directors.', null, '👨‍💼'],
      ['Sreedhar Venkat', 'BoD', 'bod', 'Key person in organizing many successful NKK events.', null, '📋'],
      ['Bharatish Shirahatti', 'BoD', 'bod', 'Volunteering since 1994. Former NKK Chairman and Vice Chairman.', null, '👴'],
      ['Bharath Tejasvi', 'Vice Chairman', 'ec', 'President in 2021/22. IT Architect and creator rooted in performing arts.', null, '🎙️'],
      ['Dr. Rupali Biradar', 'BoD', 'bod', 'M.D in Ayurveda with 15+ years experience in the US.', null, '👩‍⚕️'],
      ['Sanjay Chakrapani', 'BoD', 'bod', 'Technology spanning multiple industries, volunteering in NKK activities since 2013.', null, '👨‍💻']
    ].forEach(t => insertTeam.run(...t));
  }

  const sponsorCount = db.prepare("SELECT COUNT(*) as c FROM sponsors").get().c;
  if (sponsorCount === 0) {
    const insertSponsor = db.prepare(`INSERT INTO sponsors (name, tier, link, image_url, description) VALUES (?, ?, ?, ?, ?)`);
    [
      ['KR Elixir', 'diamond', 'https://krelixir.com', '/assets/Krelixir.png', 'Diamond Corporate Sponsor'],
      ['Serenity Smiles', 'gold', '#', '/assets/Serinity.png', 'Gold Corporate Partner'],
      ['Rapid IT', 'silver', '#', '/assets/rapidiit.png', 'Technology Partner'],
      ['Suvidha International', 'silver', '#', '/assets/Suvidha.png', 'Community Partner'],
      ['Satidhh', 'silver', '#', '/assets/Satidhh.png', 'Official Sponsor'],
      ['Mukund Galgali', 'general', '#', null, 'Community Donor'],
      ['Srikanth Honnaiah', 'general', '#', null, 'Community Donor'],
      ['Kavitha Lakshminarasaiah', 'general', '#', null, 'Community Donor']
    ].forEach(s => insertSponsor.run(...s));
  }
}

seed();
module.exports = db;
