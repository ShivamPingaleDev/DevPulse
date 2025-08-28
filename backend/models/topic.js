import Database from 'better-sqlite3';
const db = new Database('devpulse.db');

db.exec(`CREATE TABLE IF NOT EXISTS topics (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE NOT NULL
)`);

export function createTopic(name) {
  const stmt = db.prepare('INSERT INTO topics (name) VALUES (?)');
  return stmt.run(name);
}

export function getTopics() {
  const stmt = db.prepare('SELECT * FROM topics');
  return stmt.all();
}
