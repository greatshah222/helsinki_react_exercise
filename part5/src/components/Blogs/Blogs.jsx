import React, { useEffect, useState } from 'react';
import { getAllBlogs } from '../Services/blogServices';
import Blog from './Blog';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BlogForm from './BlogForm';

function Blogs({ user, logout }) {
  const [blogs, setBlogs] = useState();

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchALlBlogs = async () => {
      const res = await getAllBlogs();
      let blogInfo = [];
      await res.forEach((el) => {
        blogInfo.push({
          blogInformation: el,
          showDetail: false,
        });
      });
      blogInfo = blogInfo.sort(
        (a, b) => b.blogInformation.likes - a.blogInformation.likes
      );
      await setBlogs(blogInfo);
    };
    fetchALlBlogs();
  }, []);
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
            setBlogs={setBlogs}
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
          setBlogs={setBlogs}
          toggleFormHandler={toggleFormHandler}
          setShowForm={setShowForm}
          blogs={blogs}
        />
      )}
    </>
  );
}

export default Blogs;
