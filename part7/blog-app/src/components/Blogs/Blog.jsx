import React from 'react';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import * as actions from '../../store/actions/index';
import { useDispatch } from 'react-redux';
import classes from './Blogs.module.css';

function Blog({ blog, blogs, userID }) {
  const dispatch = useDispatch();

  const blogDetailHandler = async (id) => {
    await dispatch(actions.blogDetailhandler(id));
  };
  let ownerOfBlog;
  // we have to check blog.bloginformation.user cause during the create method we get the response and in that response the users have not been populated yet
  if (userID === blog.blogInformation.user || blog.blogInformation.user._id) {
    ownerOfBlog = true;
  }

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
    const confirm = window.confirm(
      ` Do you really want to delete ${title}? .This process cannot be undone !!!`
    );
    try {
      if (confirm) {
        await dispatch(actions.deleteBlogPost(id));
        toast.success(`Deleted ${title} successfully`);
      }
    } catch (error) {
      console.log(error);
      toast.error(`error ${title} `);
    }
  };
  let content;
  if (!blog.showDetail && blog) {
    content = (
      <div className={classes.SecondaryContainer}>
        <p>
          <strong>title: </strong>
          {blog.blogInformation.title}
        </p>
        <div className={classes.ButtonPrimary}>
          <button
            className='showDetail'
            style={{
              marginLeft: '20px',
              backgroundColor: 'rgba(163, 152, 152, 0.658)',
              borderRadius: '15px',
              color: 'white',
              padding: '0.8rem 1rem',
              cursor: 'pointer',
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
                borderRadius: '15px',
                color: 'white',
                padding: '0.8rem 1rem',
                cursor: 'pointer',
              }}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    );
  }
  if (blog.showDetail && blog) {
    content = (
      <div className={classes.SecondaryContainer}>
        <p className={classes.showDetailTitle}>
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
            className={classes.likeButton}
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
              backgroundColor: 'rgba(163, 152, 152, 0.658)',
              borderRadius: '15px',
              color: 'white',
              padding: '0.8rem 1rem',
              cursor: 'pointer',
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
                borderRadius: '15px',
                color: 'white',
                padding: '0.8rem 1rem',
                cursor: 'pointer',
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
