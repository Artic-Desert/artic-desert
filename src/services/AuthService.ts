import { GithubUser } from '../types/Types';

export const AuthService = {
  getUser: function () {
    const user = sessionStorage.getItem('user');
    if (user === 'undefined' || !user) {
      return null;
    } else {
      return JSON.parse(user);
    }
  },

  getToken: function () {
    // ADDED || process.env.REACT_APP_GHP_TOKEN
    return sessionStorage.getItem('token') || process.env.REACT_APP_GHP_TOKEN;
  },

  setUserSession: function (user: GithubUser, token: string | undefined) {
    sessionStorage.setItem('user', JSON.stringify(user));
    token && sessionStorage.setItem('token', token);
  },

  resetUserSession: function () {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('GHP_TOKEN');
  },
};
