import * as actionTypes from '../reducers/actionTypes';
import {
  getAll,
  createSingleAnecdoteBackend,
  updateBlogBackEnd,
} from '../services/blogs';

export const increaseVote = (id) => {
  return {
    type: actionTypes.VOTE,
    id,
  };
};
export const createNewNote = (content) => {
  return {
    type: actionTypes.CREATE_NEW_NOTE,
    content,
  };
};
export const initializeBlogPost = (payload) => {
  return {
    type: actionTypes.INIT_BLOG_POST,
    payload,
  };
};
// async task cause of redux thunk
export const fetchBlogPostFromServer = () => {
  return async (dispatch) => {
    const res = await getAll();
    console.log(res);
    console.log(res.data);
    await dispatch(initializeBlogPost(res.data));
  };
};
export const getCreateNoteInfoFromServer = (content) => {
  return async (dispatch) => {
    const res = await createSingleAnecdoteBackend(content);
    console.log(res);
    await dispatch(createNewNote(res));
  };
};
export const updateNoteInfoToServer = (id) => {
  return async (dispatch) => {
    const res = await updateBlogBackEnd(id);
    console.log(res);
    await dispatch(increaseVote(id));
  };
};
