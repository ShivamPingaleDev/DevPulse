import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());

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
