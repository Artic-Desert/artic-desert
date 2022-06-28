// import produce from 'immer';
import { SET_USER } from './actions';

export const initialUser = { user: undefined };

export const userReducer = (state = initialUser, action) => {
  if (action.type === SET_USER) {
    const newState = { user: action.payload };
    console.log('new state: ', newState);
    return newState;
  }
  return state;
};

// export default reducer;
