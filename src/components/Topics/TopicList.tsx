import { useState, useEffect } from "react";

export default function TopicList({ onSelect }: { onSelect: (topicId: string) => void }) {
  const [topics, setTopics] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/api/topics")
      .then(res => res.json())
      .then(data => setTopics(data.topics || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-xl font-bold mb-2">Topics</h2>
      {loading && <p>Loading...</p>}
      <ul>
        {topics.map(topic => (
          <li key={topic.id} className="mb-2">
            <button
              className="text-blue-600 underline"
              onClick={() => onSelect(topic.id)}
            >
              {topic.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
