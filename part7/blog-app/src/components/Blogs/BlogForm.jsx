import React, { useState } from 'react';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/actions/index';
import classes from './BlogForm.module.css';
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
    <div className={classes.secondaryContainer}>
      <h2 style={{ textAlign: 'center' }}>Create New Blog</h2>
      <form onSubmit={createNewBlogHandler} className='form'>
        <div className={classes.PrimaryContainer}>
          <div className={classes.TertiaryContainer}>
            <div className={classes.label}>title</div>
            <input
              className='title'
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className={classes.TertiaryContainer}>
            <div className={classes.label}>author</div>
            <input
              className='author'
              type='text'
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <div className={classes.TertiaryContainer}>
            <div className={classes.label}>url</div>
            <input
              // className is just for testing
              className='url'
              type='text'
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
        </div>
        <div className={classes.ButtonPrimary}>
          <button
            id='createNewBlog'
            type='submit'
            className={classes.ButtonCreate}
          >
            Create New Blog
          </button>
          <button onClick={toggleFormHandler}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default BlogForm;
