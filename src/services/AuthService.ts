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
    console.log('token : ', sessionStorage.getItem('token'));
    return sessionStorage.getItem('token') || process.env.REACT_APP_GHP_TOKEN;
  },

  setToken: function (token: string) {
    sessionStorage.setItem('token', token);
  },

  setUser: function (user: GithubUser) {
    sessionStorage.setItem('user', JSON.stringify(user));
  },

  resetUserSession: function () {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('GHP_TOKEN');
  },
};
