import { useState } from "react";

export default function CreateTopic({ onCreate }: { onCreate: () => void }) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("/api/topics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();
      if (data.success) {
        setName("");
        onCreate();
      } else {
        setError(data.error || "Failed to create topic");
      }
    } catch (err) {
      setError("Network error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 border rounded">
      <h2 className="text-xl font-bold mb-2">Create Topic</h2>
      <input
        type="text"
        placeholder="Topic name"
        value={name}
        onChange={e => setName(e.target.value)}
        className="w-full mb-2 p-2 border rounded"
        required
      />
      <button type="submit" className="w-full bg-purple-500 text-white p-2 rounded">Create</button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
}
