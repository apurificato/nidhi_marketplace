import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

const PrivateRoute = ({ element }) => {
  const { loggedIn } = useAuth();
  return loggedIn ? element : <Navigate to="/" />;
};

export default PrivateRoute;