import React, { useEffect, useState } from 'react';
import Blog from './Blog';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BlogForm from './BlogForm';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions/index';

function Blogs({ user, logout }) {
  const [showForm, setShowForm] = useState(false);

  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blog.blogs);

  useEffect(() => {
    dispatch(actions.initializeBlogPostFrombackend());
  }, [dispatch]);
  console.log(user);

  const toggleFormHandler = () => {
    setShowForm((prevState) => !prevState);
  };

  return (
    <>
      <ToastContainer />

      <h2> Blogs</h2>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}
      >
        <h4>{user.name} is logged in </h4>{' '}
        <button onClick={logout}>Logout</button>
      </div>

      {blogs &&
        blogs.map((el) => (
          <Blog
            blog={el}
            key={el.blogInformation.id}
            blogs={blogs}
            userID={user._id}
          />
        ))}
      {!showForm && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '2rem',
          }}
        >
          {' '}
          <button
            style={{
              fontSize: '2rem',
              backgroundColor: 'black',
              color: 'white',
            }}
            onClick={toggleFormHandler}
          >
            Add New Blog Post
          </button>
        </div>
      )}
      {showForm && (
        <BlogForm
          toggleFormHandler={toggleFormHandler}
          setShowForm={setShowForm}
          blogs={blogs}
        />
      )}
    </>
  );
}

export default Blogs;
