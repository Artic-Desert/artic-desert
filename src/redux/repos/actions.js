export const ADD_REP0 = 'ADD_REPO';
export const REMOVE_REPO = 'REMOVE_REPO';
export const SET_REPOS = 'SET_REPOS';

export const setRepos = repos => ({
  type: SET_REPOS,
  payload: repos,
});

export const addRepo = repo => ({
  type: ADD_REP0,
  payload: repo,
});

export const removeRepo = repo => ({
  type: REMOVE_REPO,
  payload: repo,
});
