import * as actionTypes from '../actions/actionTypes';
const initialState = {
  user: null,
  token: null,
  error: null,
  cookieFetch: false,
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

    default:
      return state;
  }
};

export default reducer;
