import React, { createContext, useState, useEffect } from "react";

// Create context for authentication
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem("accessToken") ? true : false;
  });

  useEffect(() => {
    // Check if token exists in sessionStorage
    const token = sessionStorage.getItem("token");
    console.log("Token from sessionStorage:", token); // Debugging log

    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const login = (token) => {
    sessionStorage.setItem("token", token);
    setIsAuthenticated(true);
    console.log("User logged in, token stored."); // Debugging log
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    setIsAuthenticated(false);
    console.log("User logged out, token removed."); // Debugging log
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
