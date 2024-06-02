import { createContext, useState, useEffect, useContext } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ITEMS } from '../graphql/queries';

const ItemsContext = createContext();

export const ItemsProvider = ({ children }) => {
    const [items, setItems] = useState(null);
    const { data, loading, error, refetch} = useQuery(GET_ITEMS, {
        onCompleted: (data) => {
            if (data?.items) {
                setItems(data.items);
            }
        },
        onError: (error) => {
            console.error('Error fetching items details:', error);
        }
    });


    return (
        <ItemsContext.Provider value={{ items, setItems, loading, error }}>
            {children}
        </ItemsContext.Provider>
    );
};

export const useItemsData = () => useContext(ItemsContext);