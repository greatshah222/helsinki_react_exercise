import React, { useState } from 'react';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/actions/index';
function BlogForm({ toggleFormHandler, setShowForm }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const dispatch = useDispatch();

  const createNewBlogHandler = async (e) => {
    e.preventDefault();
    try {
      const data = {
        title,
        author,
        url,
      };
      await dispatch(actions.createNewBlogPost(data));

      setUrl('');
      setTitle('');
      setAuthor('');
      toast.success('successfully created');
      setShowForm(false);
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
