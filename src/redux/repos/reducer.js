import { ADD_REP0, REMOVE_REPO, SET_REPOS } from './actions';

export const reposReducer = (state = [], action) => {
  if (action.type === ADD_REP0) {
    sessionStorage.setItem('repos', JSON.stringify([...state, action.payload]));
    return [...state, action.payload];
  }
  if (action.type === REMOVE_REPO) {
    sessionStorage.setItem('repos', JSON.stringify([...state, action.payload]));
    const newState = state.filter(repo => repo.id !== action.payload.id);
    return [...newState];
  }
  if (action.type === SET_REPOS) {
    sessionStorage.setItem('repos', JSON.stringify([...action.payload]));
    return [...action.payload];
  }
  return state;
};
