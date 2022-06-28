import { combineReducers, createStore } from 'redux';
import { userReducer } from './user/reducer';

const reducer = combineReducers({
  users: userReducer,
});

export const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
