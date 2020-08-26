import React, { useEffect, useState } from 'react';
import Blog from './Blog';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BlogForm from './BlogForm';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions/index';
import classes from './Blogs.module.css';
import { IoIosCreate } from 'react-icons/io';

function Blogs({ user, logout }) {
  const [showForm, setShowForm] = useState(false);

  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blog.blogs);

  useEffect(() => {
    dispatch(actions.initializeBlogPostFrombackend());
  }, [dispatch]);

  const toggleFormHandler = () => {
    setShowForm((prevState) => !prevState);
  };

  return (
    <>
      <ToastContainer />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <h2 className={classes.heading} style={{ flex: 4 }}>
          {' '}
          Blogs
        </h2>
        {!showForm && (
          <div>
            {' '}
            <button
              style={{
                fontSize: '3rem',
                border: 'none',
                padding: ' 0.5rem 1rem',
                cursor: 'pointer',
                marginRight: '100px  ',
              }}
              onClick={toggleFormHandler}
            >
              <IoIosCreate color='green' />
            </button>
          </div>
        )}
      </div>

      {showForm && (
        <BlogForm
          toggleFormHandler={toggleFormHandler}
          setShowForm={setShowForm}
          blogs={blogs}
        />
      )}
      <div className={classes.MainContainer}>
        {blogs &&
          blogs.map((el) => (
            <Blog
              blog={el}
              key={el.blogInformation.id}
              blogs={blogs}
              userID={user._id}
            />
          ))}
      </div>
    </>
  );
}

export default Blogs;
