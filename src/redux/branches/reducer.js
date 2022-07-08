import { SET_BRANCHES } from './actions';

export const branchesReducer = (state = [], action) => {
  if (action.type === SET_BRANCHES) {
    sessionStorage.setItem('branches', JSON.stringify([...action.payload]));
    return [...action.payload];
  }
  return state;
};
