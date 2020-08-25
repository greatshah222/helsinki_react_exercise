import * as actionTypes from './actionTypes';
import {
  getAllBlogs,
  createNewBlog,
  updateSingleBlog,
  deleteSingleBlog,
} from '../../components/Services/blogServices';

export const initializeBlogPostFrombackend = () => {
  return async (dispatch) => {
    try {
      const res = await getAllBlogs();
      let blogInfo = [];
      await res.forEach((el) => {
        blogInfo.push({
          blogInformation: el,
          showDetail: false,
        });
      });
      blogInfo.sort(
        (a, b) => b.blogInformation.likes - a.blogInformation.likes
      );
      await dispatch(fetchBlogPostSuccess(blogInfo));
    } catch (error) {
      dispatch(fetchBlogPostFailed(error));
    }
  };
};

export const createNewBlogPost = (data) => {
  return async (dispatch) => {
    try {
      const res = await createNewBlog(data);
      console.log(res);
      let blogInfo = [];
      await blogInfo.push({
        blogInformation: res,
        showDetail: false,
      });
      console.log(blogInfo);
      if (blogInfo.length > 0) {
        await dispatch(fetchBlogPostCreate(blogInfo[0]));
      }
    } catch (error) {
      dispatch(fetchBlogPostFailed(error));
    }
  };
};
// like increase
export const updateBlogPost = (data, id) => {
  return async (dispatch) => {
    try {
      const res = await updateSingleBlog(data, id);
      await dispatch(fetchBlogPostUpdate(res, id));
    } catch (error) {
      dispatch(fetchBlogPostFailed(error));
    }
  };
};
export const deleteBlogPost = (id) => {
  return async (dispatch) => {
    try {
      await deleteSingleBlog(id);
      await dispatch(fetchBlogPostDelete(id));
    } catch (error) {
      dispatch(fetchBlogPostFailed(error));
    }
  };
};

export const fetchBlogPostSuccess = (payload) => {
  return {
    type: actionTypes.BLOG_FETCH_SUCCESS,
    payload,
  };
};
export const fetchBlogPostFailed = (error) => {
  return {
    type: actionTypes.BLOG_FETCH_FAILED,
    error,
  };
};
export const fetchBlogPostDelete = (id) => {
  return {
    type: actionTypes.BLOG_POST_DELETE,
    id,
  };
};
export const fetchBlogPostCreate = (payload) => {
  return {
    type: actionTypes.BLOG_POST_CREATE,
    payload,
  };
};
export const fetchBlogPostUpdate = (payload, id) => {
  return {
    type: actionTypes.BLOG_POST_UPDATE,
    payload,
    id,
  };
};
// FOR CHANGING THE SHOW DETAIL TO TRUE OR FALSE
export const blogDetailhandler = (id) => {
  return {
    type: actionTypes.BLOG_DETAIL_HANDLER,
    id,
  };
};
