import { createContext, useState, useEffect, useContext } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER_DETAILS } from '../graphql/queries';
import { useAuth } from './AuthContext';

const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
    const { user } = useAuth();
    const [userDetails, setUserDetails] = useState(null);
    const { data, loading, error, refetch } = useQuery(GET_USER_DETAILS, {
        variables: { id: user?.id },
        skip: !user,
        onCompleted: (data) => {
            if (data?.user) {
                setUserDetails(data.user);
            }
        },
        onError: (error) => {
            console.error('Error fetching user details:', error);
        }
    }
    );

    useEffect(() => {
        if (user && !userDetails) {
          setUserDetails(null);
        }
      }, [user]);


    return (
        <UserDataContext.Provider value={{ userDetails, setUserDetails }}>
            {children}
        </UserDataContext.Provider>
    );
};

export const useUserData = () => useContext(UserDataContext);