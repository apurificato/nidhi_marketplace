import React, { createContext, useState, useEffect, useContext } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode as decode } from 'jwt-decode'; // Use named import for jwt-decode

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Check for a JWT cookie when the app initializes
    const token = Cookies.get('token');
    if (token) {
      try {
        const decoded = decode(token); // Use the named import function decode
        const isExpired = decoded.exp * 1000 < Date.now();
        if (!isExpired) {
          setLoggedIn(true);
        } else {
          Cookies.remove('token');
        }
      } catch (error) {
        console.error('Invalid token:', error);
        Cookies.remove('token');
      }
    }
  }, []);

  const login = (token, callback) => {
    Cookies.set('token', token);
    setLoggedIn(true);
    if (callback) callback();
  };

  const logout = () => {
    Cookies.remove('token');
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
