import { SET_BRANCH } from './actions';

export const branchReducer = (state = 'workspace', action) => {
  if (action.type === SET_BRANCH) {
    sessionStorage.setItem('branch', JSON.stringify(action.payload));
    return action.payload;
  }
  return state;
};
