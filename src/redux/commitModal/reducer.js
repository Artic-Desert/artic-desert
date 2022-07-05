import { SET_COMMIT_MODAL, SET_CURRENT_COMMIT_SHA } from './actions';

export const commitModalReducer = (state = '', action) => {
  if (action.type === SET_COMMIT_MODAL) {
    const current = action.payload;
    return current;
  }
  // if (action.type === SET_CURRENT_COMMIT_SHA){

  // }
  return state;
};
