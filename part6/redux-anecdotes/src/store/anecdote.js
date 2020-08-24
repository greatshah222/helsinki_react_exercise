import * as actionTypes from '../reducers/actionTypes';

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
