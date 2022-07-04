import { SET_BRANCHES } from './actions';

export const branchesReducer = (state = [], action) => {
  if (action.type === SET_BRANCHES) {
    console.log('BRANCHES : ', action.payload);
    sessionStorage.setItem('branches', JSON.stringify([...action.payload]));
    return [...action.payload];
  }
  return state;
};
