import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ redirect='/', children }) => {
  const access_token = useSelector((state) => state.userData.access_token)

  if(access_token === null) {
    return <Navigate replace to={redirect} />
  }

  return children ? children : <Outlet />
}

export default ProtectedRoute