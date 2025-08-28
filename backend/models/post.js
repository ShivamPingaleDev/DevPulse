import Database from 'better-sqlite3';
const db = new Database('devpulse.db');

db.exec(`CREATE TABLE IF NOT EXISTS posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  topicId INTEGER NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  FOREIGN KEY(topicId) REFERENCES topics(id)
)`);

export function createPost(topicId, title, content) {
  const stmt = db.prepare('INSERT INTO posts (topicId, title, content) VALUES (?, ?, ?)');
  return stmt.run(topicId, title, content);
}

export function getPostsByTopic(topicId) {
  const stmt = db.prepare('SELECT * FROM posts WHERE topicId = ?');
  return stmt.all(topicId);
}
