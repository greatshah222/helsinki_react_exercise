import * as actionTypes from './actionTypes';

const reducer = (state = [], action) => {
  switch (action.type) {
    case actionTypes.VOTE:
      const singleObj = state.find((el) => el.id === action.id);

      const newState = [...state];
      const i = newState.indexOf(singleObj);
      singleObj.votes += 1;
      newState[i] = singleObj;

      return newState;
    case actionTypes.INIT_BLOG_POST:
      return action.payload;
    case actionTypes.CREATE_NEW_NOTE:
      return [...state, action.content];
    default:
      return state;
  }
};

export default reducer;
