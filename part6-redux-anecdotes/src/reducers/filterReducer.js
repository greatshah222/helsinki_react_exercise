import * as actionTypes from './actionTypes';
const initialValue = '';

const reducer = (state = initialValue, action) => {
  switch (action.type) {
    case actionTypes.FILTER:
      console.log(state);

      return action.payload;
    default:
      return state;
  }
};

export default reducer;
