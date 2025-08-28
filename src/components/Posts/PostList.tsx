import { useState, useEffect } from "react";

export default function PostList({ topicId }: { topicId: string }) {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!topicId) return;
    setLoading(true);
    fetch(`/api/topics/${topicId}/posts`)
      .then(res => res.json())
      .then(data => setPosts(data.posts || []))
      .finally(() => setLoading(false));
  }, [topicId]);

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-xl font-bold mb-2">Posts</h2>
      {loading && <p>Loading...</p>}
      <ul>
        {posts.map(post => (
          <li key={post.id} className="mb-2 border p-2 rounded">
            <h3 className="font-semibold">{post.title}</h3>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
