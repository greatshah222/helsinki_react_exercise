import * as actionTypes from '../reducers/actionTypes';

export const filterCondition = (payload) => {
  return {
    type: actionTypes.FILTER,
    payload,
  };
};
