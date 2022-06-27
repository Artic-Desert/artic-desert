import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthService } from '../services/AuthService';

export const PrivateRoute = () => {
  console.log(AuthService.getToken());
  return AuthService.getToken() ? (
    <Outlet />
  ) : (
    <Navigate to={{ pathname: '/login' }} />
  );
};
