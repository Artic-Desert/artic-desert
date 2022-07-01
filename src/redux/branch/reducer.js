import { SET_BRANCH } from './actions';

export const branchReducer = (state = {}, action) => {
  if (action.type === SET_BRANCH) {
    return { ...action.payload };
  }

  return state;
};
