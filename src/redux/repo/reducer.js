import { SET_REPO } from './actions';

export const repoReducer = (state = {}, action) => {
  if (action.type === SET_REPO) {
    sessionStorage.setItem('repo', JSON.stringify({ ...action.payload }));
    return { ...action.payload };
  }

  return state;
};
