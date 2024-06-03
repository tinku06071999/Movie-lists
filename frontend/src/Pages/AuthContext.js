import React, { createContext, useContext, useState } from 'react';

// Create a context object
const AuthContext = createContext();

// Create a custom hook to use the context
export const useAuth = () => useContext(AuthContext);

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  // State to track authentication status
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to simulate login
  const login = () => {
    // Update isAuthenticated to true
    setIsAuthenticated(true);
  };

  // Function to simulate logout
  const logout = () => {
    // Update isAuthenticated to false
    setIsAuthenticated(false);
  };

  // Provide the isAuthenticated, login, and logout values to the context
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
