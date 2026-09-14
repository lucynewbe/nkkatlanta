const path = require('path');
const fs = require('fs');

const DRIVER = process.env.STORAGE_DRIVER || 'local';
const UPLOAD_DIR = process.env.UPLOAD_DIR || path.join(__dirname, '../uploads');

function ensureLocal() {
  if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  return UPLOAD_DIR;
}

function publicUrl(filename) {
  if (DRIVER === 's3' && process.env.S3_PUBLIC_BASE) {
    return `${process.env.S3_PUBLIC_BASE.replace(/\/$/, '')}/${filename}`;
  }
  return `/uploads/${filename}`;
}

module.exports = { DRIVER, UPLOAD_DIR, ensureLocal, publicUrl };
