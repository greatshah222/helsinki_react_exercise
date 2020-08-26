import {
  fetchTokenCookie,
  login,
  logoutBackend,
  getAllUsers,
  getSingleUsers,
} from '../../components/Services/userService';
import * as actionTypes from '../actions/actionTypes';

export const getCookieInfo = () => {
  return async (dispatch) => {
    try {
      const res = await fetchTokenCookie();
      console.log(res);
      dispatch(initializeUser(res.currentUser, res.token));
    } catch (error) {}
  };
};
export const initializeUser = (user, token) => {
  return {
    type: actionTypes.INIT_USER,
    user,
    token,
  };
};
export const loginUser = (data) => {
  return async (dispatch) => {
    try {
      const res = await login(data);
      console.log(res);
      await dispatch(initializeUser(res.doc, res.token));
    } catch (error) {
      dispatch(loginFailed(error));
    }
  };
};

export const loginFailed = (error) => {
  return {
    type: actionTypes.INIT_USER_FAILED,
    error,
  };
};
export const logoutUserStart = () => {
  return async (dispatch) => {
    await logoutBackend();
    await dispatch(logoutUser());
  };
};
export const logoutUser = () => {
  return {
    type: actionTypes.USER_LOGOUT,
  };
};

export const fetchAllUser = (payload) => {
  return {
    type: actionTypes.FETCH_ALL_USER,
    payload,
  };
};
export const fetchSingleUser = (payload) => {
  return {
    type: actionTypes.FETCH_SINGLE_USER,
    payload,
  };
};
export const fetchSingleUserStart = (id) => {
  return async (dispatch) => {
    try {
      const res = await getSingleUsers(id);
      console.log(res);
      await dispatch(fetchSingleUser(res));
    } catch (error) {
      await dispatch(loginFailed(error));
    }
  };
};

export const fetchAllUserStart = () => {
  return async (dispatch) => {
    try {
      const res = await getAllUsers();
      console.log(res);
      await dispatch(fetchAllUser(res));
    } catch (error) {
      await dispatch(loginFailed(error));
    }
  };
};
