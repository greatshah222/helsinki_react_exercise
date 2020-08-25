import * as actionTypes from '../actions/actionTypes';

const initialState = {
  blogs: [],
  error: null,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.BLOG_FETCH_SUCCESS:
      return { ...state, blogs: action.payload };

    case actionTypes.BLOG_FETCH_FAILED:
      return { ...state, error: action.error };

    case actionTypes.BLOG_POST_CREATE:
      return { ...state, blogs: [...state.blogs, action.payload] };

    case actionTypes.BLOG_POST_UPDATE:
      const newBlogs = [...state.blogs];
      const singleBlog = newBlogs.find(
        (el) => el.blogInformation.id === action.id
      );
      const newupdatedDetailBlog = { ...singleBlog };

      const i = newBlogs.indexOf(singleBlog);
      newBlogs[i] = newupdatedDetailBlog;
      return { ...state, blogs: newBlogs };

    case actionTypes.BLOG_POST_DELETE:
      const updatedBlog = state.blogs.filter(
        (el) => el.blogInformation.id !== action.id
      );
      return { ...state, blogs: updatedBlog };

    case actionTypes.BLOG_DETAIL_HANDLER:
      const newblogs = [...state.blogs];
      const singlBlog = newblogs.find(
        (el) => el.blogInformation.id === action.id
      );
      const newupdatedDetailPost = { ...singlBlog };
      newupdatedDetailPost.showDetail = !newupdatedDetailPost.showDetail;
      const index = newblogs.indexOf(singlBlog);
      newblogs[index] = newupdatedDetailPost;
      return { ...state, blogs: newblogs };

    default:
      return state;
  }
};
export default reducer;
