import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from './AuthProvider';

const PrivateRouter = () => {
  const { user, isLoading } = useAuthContext();

  if (!isLoading && !user) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export default PrivateRouter;
