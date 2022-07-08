import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthService } from '../services/AuthService';

export const PrivateRoute = () => {
  return AuthService.getToken() ? (
    <Outlet />
  ) : (
    <Navigate to={{ pathname: '/' }} />
  );
};
