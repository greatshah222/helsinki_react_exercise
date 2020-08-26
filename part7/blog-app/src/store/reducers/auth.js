import * as actionTypes from '../actions/actionTypes';
const initialState = {
  user: null,
  token: null,
  error: null,
  cookieFetch: false,
  users: [],
  singleUser: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INIT_USER:
      return {
        ...state,
        cookieFetch: true,
        user: action.user,
        token: action.token,
        error: null,
      };
    case actionTypes.INIT_USER_FAILED:
      return {
        ...state,
        cookieFetch: true,
        error: action.error,
      };
    case actionTypes.USER_LOGOUT:
      return {
        ...state,
        token: null,
        user: null,
      };
    case actionTypes.FETCH_ALL_USER:
      console.log(action.payload);
      return {
        ...state,
        users: action.payload,
      };
    case actionTypes.FETCH_SINGLE_USER:
      console.log(action.payload);
      return {
        ...state,
        singleUser: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
