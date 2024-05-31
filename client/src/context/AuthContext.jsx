import  { createContext, useState, useEffect, useContext } from 'react';
import Cookies from 'js-cookie';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../graphql/queries';
// Use named import for jwt-decode

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null)

  const { data, refetch } = useQuery(GET_ME, {
    skip: !Cookies.get('token'), // Skip the query if no token is present
    onCompleted: (data) => {
      if (data?.me) {
        setLoggedIn(true);
        setUser(data.me);
      }
    },
    onError: (error) => {
      console.error('Error fetching user:', error);
      Cookies.remove('token');
      setLoggedIn(false);
      setUser(null);
    }
  });
  console.log(data)

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      refetch();
    }
  }, []);

const login = (token, callback) => {
  Cookies.set('token', token);
  refetch().then(() => {
    if (callback) callback();
  });
};

// const logout = () => {
//   Cookies.remove('token');
//   setLoggedIn(false);
//   setUser(null);
// };

const logout = (callback) => {
  Cookies.remove('token');
  refetch().then(() => {
    if (callback) callback();
  });
};

return (
  <AuthContext.Provider value={{ loggedIn, user, login, logout }}>
    {children}
  </AuthContext.Provider>
);
};

export const useAuth = () => useContext(AuthContext);
