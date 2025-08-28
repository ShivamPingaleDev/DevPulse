import { useState } from "react";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import TopicList from "./components/Topics/TopicList";
import CreateTopic from "./components/Topics/CreateTopic";
import PostList from "./components/Posts/PostList";
import CreatePost from "./components/Posts/CreatePost";
import CommentList from "./components/Comments/CommentList";
import CreateComment from "./components/Comments/CreateComment";


function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(data.results || []);
    } catch (error) {
      // Optionally handle error
    }
    setLoading(false);
  };

  // Auth UI
  if (!user) {
    return (
      <div className="p-6 max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">DevPulse</h1>
        {showRegister ? (
          <>
            <Register />
            <button className="mt-2 underline text-blue-500" onClick={() => setShowRegister(false)}>Already have an account? Login</button>
          </>
        ) : (
          <>
            <Login onLogin={token => setUser(token)} />
            <button className="mt-2 underline text-blue-500" onClick={() => setShowRegister(true)}>No account? Register</button>
          </>
        )}
      </div>
    );
  }

  // Main UI
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">DevPulse</h1>

      {/* Error Search Tool */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Error Search</h2>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Enter your error message..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 w-full"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Search
          </button>
        </div>
        {loading && <p className="text-gray-500">Searching...</p>}
        {results.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Results</h2>
            <ul>
              {results.map((item, idx) => (
                <li key={idx} className="mb-4 p-4 border rounded">
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 font-bold">
                    {item.title}
                  </a>
                  <p className="text-gray-700">{item.content}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Reddit-like Community */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Community</h2>
        <CreateTopic onCreate={() => {}} />
        <TopicList onSelect={id => { setSelectedTopic(id); setSelectedPost(null); }} />
        {selectedTopic && (
          <>
            <CreatePost topicId={selectedTopic} onCreate={() => {}} />
            <PostList topicId={selectedTopic} />
            {/* Select a post to view comments */}
            <input
              type="text"
              placeholder="Enter post ID to view comments"
              value={selectedPost || ""}
              onChange={e => setSelectedPost(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 mt-2"
            />
            {selectedPost && (
              <>
                <CreateComment postId={selectedPost} onCreate={() => {}} />
                <CommentList postId={selectedPost} />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
