import * as actionTypes from './actionTypes';
const notification = '';

const reducer = (state = notification, action) => {
  switch (action.type) {
    case actionTypes.MESSAGE:
      return action.payload;
    default:
      return state;
  }
};

export default reducer;
