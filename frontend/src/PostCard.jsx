
import {  Trash2, MessageSquare } from 'lucide-react';
const PostCard = ({ post, handleDeletePost }) => (
  <div className="post-card">
    <div>
      <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem' }}>
        {post.caption}
      </h3>
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
        style={{
          padding: '0.25rem',
          borderRadius: '9999px',
          color: '#ef4444',
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer',
          transition: 'background-color 0.15s'
        }}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#fee2e2'} 
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        aria-label={`Delete post ${post.caption}`}
      >
        <Trash2 style={{ width: '1.25rem', height: '1.25rem' }} />
      </button>
    </div>
  </div>
);


export default PostCard;