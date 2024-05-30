import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ITEMS } from '../graphql/queries';

const ItemList = () => {
    const { data, loading, error } = useQuery(GET_ITEMS);
  
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading items for sale</div>;
  
    return (
      <div>
        <h1>All Items for Sale</h1>
        <ul>
          {data.items.map(item => (
            <li key={item.id}>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p>Starting Bid: {item.startingBid}</p>
              <p>Current Bid: {item.currentBid}</p>
              <p>Seller: {item.seller.username}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default ItemList;