

// import React ,{useState}from 'react'


// import {fetchPosts} from './App'





// const PostForm = () => {

//   async function handlePostSubmit(e){

//    e.preventDefault();

//    const data={
//     caption:caption||'Untitled',
//     content:content
             
//    }
    
//   try{
//      const res=await fetch(`${API}/posts`,{
//       method:"POST",
//       headers:{contentType:"application/json"},
//       body:JSON.Stringify(data)
//      });

//      await fetchPosts();


//     }
//        catch(err){
//         console.error("error while posting ",err.message)
//         setError('Error while submitting the posting the data')
//   }
//   finally{
//      setLoading(false);
//   }


//   }

//   const [caption,setCaption]=useState('');

//   const [content,setContent]=useState('');

//   const [submitting,setSubmitting]=useState('')



//   return (
//     <form onSubmit={handlePostSubmit} action="" >
        
//          <input type="text"
//          placeholder="caption....(Optional) "
//          value={caption}
//          onChange={(e)=>setCaption(e.target.value)}
//          class="form-input"
//           />

//          <textarea name="content" id="content" 
//           value={content}
//           onChange={(e)=>setContent(e.target.value)}
//           placeholder='enter content here..(Required)' 
//           class='form-input'
//           required 
//           rows={4}>



//          </textarea>

//         <button style={{color:"white",backgroundColor:"green"}} class="form-button">Post</button>


//       </form>
//   )
// }

import { PlusCircle, Loader } from 'lucide-react';


const PostForm = ({ 
  newPostContent, setNewPostContent, 
  newPostCaption, setNewPostCaption, 
  handleCreatePost, isSubmitting 
}) => (
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
              className="form-input"
          />
          <textarea
              placeholder="Post Content (Required)..."
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              required
              rows="4"
              className="form-input"
              style={{ resize: 'none' }}
          />
          <button
              type="submit"
              disabled={isSubmitting || !newPostContent.trim()}
              className="submit-button"
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
);

export default PostForm;