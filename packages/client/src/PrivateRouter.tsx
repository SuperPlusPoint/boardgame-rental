import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from './AuthProvider';
import Loading from './components/Loading';

const PrivateRouter = () => {
  const { user, isLoading } = useAuthContext();
  if (isLoading) {
    return <Loading />;
  }
  if (!user) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export default PrivateRouter;
