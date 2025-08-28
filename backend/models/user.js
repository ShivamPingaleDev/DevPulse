import Database from 'better-sqlite3';
const db = new Database('devpulse.db');

db.exec(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
)`);

export function createUser(email, password) {
  const stmt = db.prepare('INSERT INTO users (email, password) VALUES (?, ?)');
  return stmt.run(email, password);
}

export function getUserByEmail(email) {
  const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
  return stmt.get(email);
}
