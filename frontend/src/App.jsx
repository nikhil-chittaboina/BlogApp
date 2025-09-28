import React, { useState, useEffect } from 'react';
import { PlusCircle, Trash2, Loader, MessageSquare } from 'lucide-react';

// --- API Configuration ---
// The base URL for Express API running on port 3000
const REACT_APP_API_URL ="https://blogapp-v10d.onrender.com/posts";

// --- Application Component ---

export default function App() {
  // Initialize posts to an empty array now, as we will fetch real data
  const [posts, setPosts] = useState([]); 
  const [loading, setLoading] = useState(true); // Start as true to show loading spinner immediately
  const [error, setError] = useState(null);

  // State for the creation form
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostCaption, setNewPostCaption] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- API Functions ---
  
  // 1. READ (GET All Posts)
  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
        const response = await fetch(REACT_APP_API_URL);

        if (!response.ok) {
            throw new Error(`Failed to fetch posts. Status: ${response.status}`);
        }
        
        const data = await response.json();
        setPosts(data.reverse()); // Reverse to show latest first
        
    } catch (err) {
      console.error("Fetch error:", err);
      // Detailed error message guiding the user
      setError(`Failed to load posts. Is the Node.js server running on port 3000? Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Run the fetchPosts function once when the component mounts
  useEffect(() => {
    fetchPosts();
  }, []); // Empty array ensures this runs only on mount

  // 2. CREATE (POST New Post)
  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    setIsSubmitting(true);
    setError(null);

    const postData = {
      content: newPostContent,
      caption: newPostCaption || 'Untitled Post',
    };
    
    try {
        const response = await fetch(REACT_APP_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postData),
        });

        if (!response.ok) {
            // Attempt to read error message from backend (e.g., validation error from 400 status)
            const errorData = await response.json();
            throw new Error(errorData.msg || `Post creation failed with status ${response.status}.`);
        }

        // Successfully created (Status 201), now refresh the list
        await fetchPosts(); 

        // Reset the form state
        setNewPostContent('');
        setNewPostCaption('');
        
    } catch (err) {
      console.error("Create error:", err);
      setError(`Error creating post: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 3. DELETE (DELETE Post)
  const handleDeletePost = async (id) => {
    // IMPORTANT: Replacing window.confirm with a custom modal is best practice in modern apps
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
        const response = await fetch(`${REACT_APP_API_URL}/${id}`, {
            method: 'DELETE',
        });

        // Backend should return 204 No Content on successful delete
        if (response.status === 204 || response.status === 200) {
            // Update state locally for faster UI update (no need to re-fetch entire list)
            setPosts(posts.filter(post => post._id !== id));
        } else if (response.status === 404) {
             setError("Post not found or already deleted.");
        } else {
            throw new Error(`Delete failed with status: ${response.status}`);
        }
        
    } catch (err) {
      console.error("Delete error:", err);
      setError(`Error deleting post: ${err.message}`);
    }
  };
  
  // --- UI Components ---
  // MODIFIED to use PURE CSS classes/styles
  const PostCard = ({ post }) => (
    // Replaced Tailwind classes with a fixed CSS class
    <div className="post-card">
      <div>
        {/* Replaced Tailwind classes with inline styles */}
        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem' }}>
          {post.caption}
        </h3>
        {/* Added whitespace-pre-wrap style to preserve formatting in content */}
        <p style={{ color: '#4b5563', marginBottom: '1rem', whiteSpace: 'pre-wrap' }}>
          {post.content}
        </p>
      </div>
      
      {/* Footer section using Flexbox */}
      <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.875rem', 
          color: '#6b7280',
          marginTop: '0.5rem',
          paddingTop: '0.5rem',
          borderTop: '1px solid #f3f4f6' 
      }}>
        <span style={{ display: 'flex', alignItems: 'center' }}>
          <MessageSquare style={{ width: '1rem', height: '1rem', marginRight: '0.25rem', color: '#3b82f6' }} />
          {post.comments ? post.comments.length : 0} Comments
        </span>
        <span style={{ fontSize: '0.75rem' }}>
          {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'Date N/A'}
        </span>
        <button
          onClick={() => handleDeletePost(post._id)}
          // Button styles using pure CSS
          style={{
            padding: '0.25rem',
            borderRadius: '9999px',
            color: '#ef4444',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.15s'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#fee2e2'} // Simple hover effect
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          aria-label={`Delete post ${post.caption}`}
        >
          <Trash2 style={{ width: '1.25rem', height: '1.25rem' }} />
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-inter p-4 sm:p-8">
      {/* 1. Load Tailwind for the rest of the app structure */}
      <script src="https://cdn.tailwindcss.com"></script>
      
      {/* 2. Custom CSS Styles for the PostCard (Pure CSS) */}
      <style>
        {`
        .post-card {
            background-color: white;
            padding: 1rem; /* 16px */
            border-radius: 0.75rem; /* 12px */
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
            transition: box-shadow 0.3s;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            /* Using max-width instead of fixed px is always better for responsiveness */
            max-width: 100%;
        }
        .post-card:hover {
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
        }

        /* Pure CSS for the Form button to demonstrate fixed sizing */
        .submit-button {
            width: 100%;
            background-color: #4f46e5; /* indigo-600 */
            color: white;
            font-weight: bold;
            padding: 0.75rem; /* 12px */
            border-radius: 0.5rem; /* 8px */
            border: none;
            cursor: pointer;
            transition: background-color 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .submit-button:hover:not(:disabled) {
            background-color: #4338ca; /* indigo-700 */
        }
        .submit-button:disabled {
            background-color: #a5b4fc; /* light indigo */
            cursor: not-allowed;
        }

        /* Input styling for consistency */
        .form-input {
            width: 100%;
            padding: 0.75rem;
            border: 1px solid #d1d5db;
            border-radius: 0.5rem;
            transition: border-color 0.2s, box-shadow 0.2s;
        }
        .form-input:focus {
            outline: none;
            border-color: #6366f1; /* indigo-500 */
            box-shadow: 0 0 0 1px #6366f1;
        }

        .loader-spin {
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }s
        }
        `}
      </style>
      
      <div className="max-w-4xl mx-auto">
        <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2.25rem', fontWeight: '800', color: '#4f46e5' }}>BLOG YOUR DAY </h1>
          <p style={{ fontSize: '1.125rem', color: '#6b7280' }}>"Blogging is not about writing for your own pleasure, but about providing value for your readers."</p>
        </header>

        {/* Error Message Display (Kept Tailwind for simplicity here) */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-6 shadow-md" role="alert">
            <p className="font-bold">Error:</p>
            <p className="text-sm">{error}</p>
             <p className="text-xs mt-1">
                *HINT: Ensure your Node.js server is running and the database is connected!
            </p>
          </div>
        )}

        {/* Post Creation Form (Modified to use custom CSS classes) */}
        <section className="bg-white p-6 rounded-2xl shadow-xl mb-8 border border-indigo-100">
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#4f46e5', marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
            <PlusCircle style={{ width: '1.5rem', height: '1.5rem', marginRight: '0.5rem' }} /> Create New Post
          </h2>
          <form onSubmit={handleCreatePost} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input
              type="text"
              placeholder="Post Caption (Optional)"
              value={newPostCaption}
              onChange={(e) => setNewPostCaption(e.target.value)}
              className="form-input" // Using new CSS class
            />
            <textarea
              placeholder="Post Content (Required)..."
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              required
              rows="4"
              className="form-input" // Using new CSS class
              style={{ resize: 'none' }}
            />
            <button
              type="submit"
              disabled={isSubmitting || !newPostContent.trim()}
              className="submit-button" // Using new CSS class
            >
              {isSubmitting ? (
                <>
                  <Loader className="loader-spin" style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem' }} />
                  Publishing...
                </>
              ) : (
                'Publish Post'
              )}
            </button>
          </form>
        </section>

        {/* Posts List Display (Tailwind kept for outer structure) */}
        <h2 className="text-3xl font-bold text-gray-700 mb-6 border-b pb-2">
          {loading ? 'Loading Posts...' : `All Posts (${posts.length})`}
        </h2>
        
        {loading && (
          <div className="text-center py-10 text-indigo-500">
            <Loader className="w-10 h-10 mx-auto loader-spin" />
            <p className="mt-2">Connecting to Backend...</p>
          </div>
        )}

        {!loading && posts.length === 0 && !error && (
          <div className="text-center py-10 text-gray-500 bg-white rounded-xl shadow-inner">
            No posts found. Create one above!
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {console.log(posts)}
          {posts.map(post => ( 
            <PostCard key={post._id} post={post} />
          ))}
        </div>
        
      </div>
    </div>
  );
}
