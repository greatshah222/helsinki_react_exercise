import * as actionTypes from '../reducers/actionTypes';

export const displayNotification = (message) => {
  return {
    type: actionTypes.MESSAGE,
    payload: message,
  };
};
