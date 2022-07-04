import { SET_TOKEN } from './actions';

export const tokenReducer = (state = '', action) => {
  if (action.type === SET_TOKEN) {
    sessionStorage.setItem('GHP_TOKEN', action.payload);
    return action.payload;
  }
  return state;
};
