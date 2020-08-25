import React from 'react';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import * as actions from '../../store/actions/index';
import { useDispatch } from 'react-redux';

function Blog({ blog, blogs, userID }) {
  const dispatch = useDispatch();

  const blogDetailHandler = async (id) => {
    await dispatch(actions.blogDetailhandler(id));
  };
  let ownerOfBlog;
  console.log(blog);
  if (userID === blog.blogInformation.user._id) {
    ownerOfBlog = true;
  }
  console.log(userID, blog.blogInformation.user._id);

  const likeUpdateHandler = async (id) => {
    try {
      console.log(id);
      const newBlogs = [...blogs];

      const singleBlog = newBlogs.find((el) => el.blogInformation.id === id);
      const newupdatedDetailBlog = { ...singleBlog };

      newupdatedDetailBlog.blogInformation.likes += 1;

      const index = newBlogs.indexOf(singleBlog);
      newBlogs[index] = newupdatedDetailBlog;
      const data = {
        likes: newupdatedDetailBlog.blogInformation.likes,
      };
      // for testing jest and react-library testing put setBlogs() before updateSingleBlog(i dont know why)

      await dispatch(actions.updateBlogPost(data, id));

      toast.success('liked');
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  const deleteBlogHandler = async (id, title) => {
    console.log(id);
    const confirm = window.confirm(
      ` Do you really want to delete ${title}? .This process cannot be undone !!!`
    );
    try {
      if (confirm) {
        console.log(id);
        await dispatch(actions.deleteBlogPost(id));
        toast.success(`Deleted ${title} successfully`);
      }
    } catch (error) {
      console.log(error);
      toast.error(`error ${title} successfully`);
    }
  };
  let content;
  if (!blog.showDetail && blog) {
    content = (
      <div
        style={{
          minHeight: '20vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '3rem',
          boxShadow: ' 1px 1px black, -1em 0 .4em black',
        }}
      >
        <p>
          <strong>title: </strong>
          {blog.blogInformation.title}
        </p>
        <button
          className='showDetail'
          style={{
            marginLeft: '20px',
            backgroundColor: 'green',
            color: 'white',
            padding: '0.5rem',
          }}
          onClick={() => blogDetailHandler(blog.blogInformation.id)}
        >
          Show Details
        </button>
        {ownerOfBlog && (
          <button
            onClick={() =>
              deleteBlogHandler(
                blog.blogInformation.id,
                blog.blogInformation.title
              )
            }
            style={{
              marginLeft: '20px',
              backgroundColor: 'red',
              color: 'white',
              padding: '0.5rem',
            }}
          >
            Delete
          </button>
        )}
      </div>
    );
  }
  if (blog.showDetail && blog) {
    content = (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          marginBottom: '3rem',
        }}
      >
        <p>
          <strong>title: </strong>
          {blog.blogInformation.title}
        </p>
        <p>
          <strong>author: </strong>
          {blog.blogInformation.author}
        </p>
        <p>
          <strong>url: </strong>
          {blog.blogInformation.url}
        </p>
        <p id='likes'>
          <strong>likes: </strong>
          {blog.blogInformation.likes}{' '}
          <button
            id='likeButton'
            onClick={() => likeUpdateHandler(blog.blogInformation.id)}
          >
            Like
          </button>
        </p>
        <div>
          <button
            style={{
              marginLeft: '20px',
              backgroundColor: 'green',
              color: 'white',
              padding: '0.5rem',
            }}
            onClick={() => blogDetailHandler(blog.blogInformation.id)}
          >
            Hide Details
          </button>
          {ownerOfBlog && (
            <button
              onClick={() =>
                deleteBlogHandler(
                  blog.blogInformation.id,
                  blog.blogInformation.title
                )
              }
              style={{
                marginLeft: '20px',
                backgroundColor: 'red',
                color: 'white',
                padding: '0.5rem',
              }}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    );
  }
  return <>{content}</>;
}

export default Blog;
