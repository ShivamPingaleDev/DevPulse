import Database from 'better-sqlite3';
const db = new Database('devpulse.db');

db.exec(`CREATE TABLE IF NOT EXISTS comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  postId INTEGER NOT NULL,
  content TEXT NOT NULL,
  FOREIGN KEY(postId) REFERENCES posts(id)
)`);

export function createComment(postId, content) {
  const stmt = db.prepare('INSERT INTO comments (postId, content) VALUES (?, ?)');
  return stmt.run(postId, content);
}

export function getCommentsByPost(postId) {
  const stmt = db.prepare('SELECT * FROM comments WHERE postId = ?');
  return stmt.all(postId);
}
