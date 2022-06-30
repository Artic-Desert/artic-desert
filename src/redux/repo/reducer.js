import { SET_REPO } from './actions';

export const repoReducer = (state = {}, action) => {
  if (action.type === SET_REPO) {
    return { ...action.payload };
  }

  return state;
};
