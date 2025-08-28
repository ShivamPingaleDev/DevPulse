import { useState } from "react";

export default function CreatePost({ topicId, onCreate }: { topicId: string, onCreate: () => void }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`/api/topics/${topicId}/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
      const data = await res.json();
      if (data.success) {
        setTitle("");
        setContent("");
        onCreate();
      } else {
        setError(data.error || "Failed to create post");
      }
    } catch (err) {
      setError("Network error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 border rounded">
      <h2 className="text-xl font-bold mb-2">Create Post</h2>
      <input
        type="text"
        placeholder="Post title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="w-full mb-2 p-2 border rounded"
        required
      />
      <textarea
        placeholder="Post content"
        value={content}
        onChange={e => setContent(e.target.value)}
        className="w-full mb-2 p-2 border rounded"
        required
      />
      <button type="submit" className="w-full bg-orange-500 text-white p-2 rounded">Create</button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
}
