import { SET_REPO_MODAL } from './actions';

export const repoModalReducer = (state = '', action) => {
  if (action.type === SET_REPO_MODAL) {
    const current = action.payload;
    return current;
  }

  return state;
};
