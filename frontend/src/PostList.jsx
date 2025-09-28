
import { Loader} from 'lucide-react';
const PostsList = ({ posts, loading, error, handleDeletePost }) => (
  <>
      <h2 className="text-3xl font-bold text-gray-700 mb-6 border-b pb-2">
          {loading ? 'Loading Posts...' : `All Posts (${posts.length})`}
      </h2>

      {/* Loading Spinner */}
      {loading && (
          <div className="text-center py-10 text-indigo-500">
              <Loader className="w-10 h-10 mx-auto loader-spin" />
              <p className="mt-2">Connecting to Backend...</p>
          </div>
      )}

      {/* Empty State */}
      {!loading && posts.length === 0 && !error && (
          <div className="text-center py-10 text-gray-500 bg-white rounded-xl shadow-inner">
              No posts found. Create one above!
          </div>
      )}

      {/* Mapping Posts */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {posts.map(post => ( 
              // Pass the delete handler down to PostCard
              <PostCard key={post._id} post={post} handleDeletePost={handleDeletePost} />
          ))}
      </div>
  </>
);
export default PostsList;