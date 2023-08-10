import React from 'react';
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRouteElement = ({ isLoggedIn }) => {
  return (
    // props.isLoggedIn ? <Component {...props} /> : <Navigate to="/sign-in" replace />
    isLoggedIn ? <Outlet /> : <Navigate to="/sign-in" replace />
  )
}

export default ProtectedRouteElement;