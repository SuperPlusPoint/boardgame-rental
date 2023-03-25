import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRouter = () => {
  const isLogin = true;

  if (!isLogin) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export default PrivateRouter;
