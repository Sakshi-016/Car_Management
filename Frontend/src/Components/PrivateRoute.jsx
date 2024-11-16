import React from 'react';
import { Route, Navigate } from 'react-router-dom';

// PrivateRoute component to handle access control
const PrivateRoute = ({ element, ...rest }) => {
  const isAuthenticated = sessionStorage.getItem('token'); // Check if the user is authenticated (this is a simple example, you can customize it)

  return (
    <Route
      {...rest}
      element={isAuthenticated ? element : <Navigate to="/login" />}
    />
  );
};

export default PrivateRoute;
