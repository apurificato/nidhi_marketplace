import React, { createContext, useState, useEffect, useContext } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Check for a JWT cookie when the app initializes
    const token = Cookies.get('token');
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  const login = (token) => {
    Cookies.set('token', token);
    setLoggedIn(true);
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