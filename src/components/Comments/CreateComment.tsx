import { useState } from "react";

export default function CreateComment({ postId, onCreate }: { postId: string, onCreate: () => void }) {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`/api/posts/${postId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      const data = await res.json();
      if (data.success) {
        setContent("");
        onCreate();
      } else {
        setError(data.error || "Failed to add comment");
      }
    } catch (err) {
      setError("Network error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 border rounded">
      <h2 className="text-xl font-bold mb-2">Add Comment</h2>
      <textarea
        placeholder="Comment content"
        value={content}
        onChange={e => setContent(e.target.value)}
        className="w-full mb-2 p-2 border rounded"
        required
      />
      <button type="submit" className="w-full bg-teal-500 text-white p-2 rounded">Add Comment</button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
}
