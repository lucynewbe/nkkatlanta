const Database = require("better-sqlite3");
const path = require("path");
const db = new Database(path.join(__dirname, "db/nkk.db"));

try {
  db.exec("ALTER TABLE events ADD COLUMN date TEXT");
  console.log("Added 'date' column");
} catch (e) {
  console.log("'date' column already exists");
}

try {
  db.exec("ALTER TABLE events ADD COLUMN register_url TEXT");
  console.log("Added 'register_url' column");
} catch (e) {
  console.log("'register_url' column already exists");
}

try {
  db.exec("ALTER TABLE events ADD COLUMN location TEXT");
  console.log("Added 'location' column");
} catch (e) {
  console.log("'location' column already exists");
}

console.log("Migration complete");
process.exit(0);
