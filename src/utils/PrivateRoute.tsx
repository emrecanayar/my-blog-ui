import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import authStore from '../stores/auth/authStore';

interface PrivateRouteProps {
  children: ReactNode; // Children, ReactNode tipinde olabilir.
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const isAuthenticated = authStore.isAuthenticated;

  // isAuthenticated durumuna bağlı olarak ya children'ı ya da Navigate component'ini döndür.
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

export default PrivateRoute;