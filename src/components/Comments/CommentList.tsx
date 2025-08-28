import { useState, useEffect } from "react";

export default function CommentList({ postId }: { postId: string }) {
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!postId) return;
    setLoading(true);
    fetch(`/api/posts/${postId}/comments`)
      .then(res => res.json())
      .then(data => setComments(data.comments || []))
      .finally(() => setLoading(false));
  }, [postId]);

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-xl font-bold mb-2">Comments</h2>
      {loading && <p>Loading...</p>}
      <ul>
        {comments.map(comment => (
          <li key={comment.id} className="mb-2 border p-2 rounded">
            <p>{comment.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
