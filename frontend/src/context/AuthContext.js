// import React, { createContext, useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(localStorage.getItem('token') || '');
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (token) {
//       verifyToken(token);
//     }
//   }, [token]);

//   const verifyToken = async (token) => {
//     try {
//       const response = await axios.post('https://movie-lists-server.vercel.app/api/verify-token', { token });
//       setUser(response.data.user);
//     } catch (error) {
//       setToken('');
//       localStorage.removeItem('token');
//       navigate('/login');
//     }
//   };

//   const login = (token) => {
//     setToken(token);
//     localStorage.setItem('token', token);
//     verifyToken(token);
//   };

//   const logout = () => {
//     setToken('');
//     setUser(null);
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   return (
//     <AuthContext.Provider value={{ token, user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export { AuthContext, AuthProvider };
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
