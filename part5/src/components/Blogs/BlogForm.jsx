import React, { useState } from 'react';
import { createNewBlog } from '../Services/blogServices';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function BlogForm({ toggleFormHandler, setShowForm, setBlogs, blogs }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const createNewBlogHandler = async (e) => {
    e.preventDefault();
    try {
      const data = {
        title,
        author,
        url,
      };
      const res = await createNewBlog(data);
      const newBlog = [];

      await newBlog.push({
        blogInformation: res,
        showDetail: false,
      });

      if (newBlog.length > 0 && res) {
        await setBlogs([...blogs, newBlog[0]]);

        setUrl('');
        setTitle('');
        setAuthor('');
        toast.success('successfully created');
        setShowForm(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom: '2rem',
        flexDirection: 'column',
        minHeight: '40vh',
      }}
    >
      <h2>Create New Blog</h2>
      <form onSubmit={createNewBlogHandler} className='form'>
        <div style={{ marginBottom: '1rem' }}>
          title
          <input
            className='title'
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          author
          <input
            className='author'
            type='text'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          url
          <input
            // className is just for testing
            className='url'
            type='text'
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <button id='createNewBlog'>Create New Blog</button>
      </form>
      <button onClick={toggleFormHandler}>Cancel</button>
    </div>
  );
}

export default BlogForm;
