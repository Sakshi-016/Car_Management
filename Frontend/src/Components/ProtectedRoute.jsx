import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  // Debugging log to check if isAuthenticated is true or false
  console.log("ProtectedRoute isAuthenticated:", isAuthenticated);

  // If the user is not authenticated, redirect to login page
  // if (!isAuthenticated) {
  //   return <Navigate to="/" />;
  // }

  return children;
};

export default ProtectedRoute;
