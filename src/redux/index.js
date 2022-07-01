import { combineReducers, createStore } from 'redux';
import { userReducer } from './user/reducer';
import { kanbanReducer } from './kanban/reducer';
import { repoReducer } from './repo/reducer';
import { branchReducer } from './branch/reducer';

const reducer = combineReducers({
  users: userReducer,
  kanban: kanbanReducer,
  repo: repoReducer,
  branch: branchReducer,
});

export const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
