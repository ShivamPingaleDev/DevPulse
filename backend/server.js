import express from "express";
import axios from "axios";
import cors from "cors";
import bodyParser from "body-parser";
import { createUser, getUserByEmail } from "./models/user.js";
import { createTopic, getTopics } from "./models/topic.js";
import { createPost, getPostsByTopic } from "./models/post.js";
import { createComment, getCommentsByPost } from "./models/comment.js";


const app = express();
app.use(cors());
app.use(bodyParser.json());


// --- Auth ---
app.post("/api/register", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Missing email or password" });
  try {
    createUser(email, password);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: "Email already exists" });
  }
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  const user = getUserByEmail(email);
  if (user && user.password === password) {
    // For demo: return a fake token
    res.json({ token: "demo-token", user: { id: user.id, email: user.email } });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

// --- Topics ---
app.get("/api/topics", (req, res) => {
  res.json({ topics: getTopics() });
});

app.post("/api/topics", (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Missing topic name" });
  try {
    createTopic(name);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: "Topic already exists" });
  }
});

// --- Posts ---
app.get("/api/topics/:topicId/posts", (req, res) => {
  const { topicId } = req.params;
  res.json({ posts: getPostsByTopic(topicId) });
});

app.post("/api/topics/:topicId/posts", (req, res) => {
  const { topicId } = req.params;
  const { title, content } = req.body;
  if (!title || !content) return res.status(400).json({ error: "Missing title or content" });
  createPost(topicId, title, content);
  res.json({ success: true });
});

// --- Comments ---
app.get("/api/posts/:postId/comments", (req, res) => {
  const { postId } = req.params;
  res.json({ comments: getCommentsByPost(postId) });
});

app.post("/api/posts/:postId/comments", (req, res) => {
  const { postId } = req.params;
  const { content } = req.body;
  if (!content) return res.status(400).json({ error: "Missing comment content" });
  createComment(postId, content);
  res.json({ success: true });
});

// --- Error Search ---
app.get("/search", async (req, res) => {
  const { q } = req.query;
  try {
    const response = await axios.get(
      `http://localhost:8080/search?q=${encodeURIComponent(q)}&format=json`
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Error fetching from SearXNG" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
  console.log("Starting server.js...");
});
