const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '../db/nkk.db');
const destDir = process.env.BACKUP_DIR || path.join(__dirname, '../backups');
fs.mkdirSync(destDir, { recursive: true });
const stamp = new Date().toISOString().replace(/[:.]/g, '-');
const dest = path.join(destDir, `nkk-${stamp}.db`);
fs.copyFileSync(src, dest);
console.log('Backup written to', dest);
