import { combineReducers, createStore } from 'redux';
import { userReducer } from './user/reducer';
import { kanbanReducer } from './kanban/reducer';
import { repoReducer } from './repo/reducer';
import { branchReducer } from './branch/reducer';
import { reposReducer } from './repos/reducer';
import { branchesReducer } from './branches/reducer';
import { tokenReducer } from './token/reducer';

const reducer = combineReducers({
  users: userReducer,
  kanban: kanbanReducer,
  repo: repoReducer, //this is the repo selected for the workspace
  branch: branchReducer,
  repos: reposReducer, //this are the repos in the sidebar
  branches: branchesReducer, //this is for the branch name in the git timelien
  token: tokenReducer, // for auth on github api calls
});

export const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
