import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { PLACE_BID } from '../graphql/mutations';
import { useAuth } from '../context/AuthContext';

const ProductItem = ({ item }) => {
  const [bidValue, setBidValue] = useState(item.currentBid + 1);
  const { user } = useAuth();

  const [placeBid] = useMutation(PLACE_BID, {
    onCompleted: () => {
      // Optionally, add logic to refresh the item data or give feedback to the user
    },
    onError: (error) => {
      console.error('Error placing bid:', error);
    }
  });

  const handleInputChange = (event) => {
    setBidValue(parseFloat(event.target.value));
  };

  const handleBidSubmit = async (event) => {
    event.preventDefault();
    try {
      await placeBid({
        variables: {
          userId: user.id,
          itemId: item.id,
          amount: bidValue,
        }
      });
    } catch (error) {
      console.error('Error placing bid:', error);
    }
  };

  const isSeller = user.id === item.seller.id;

  return (
    <div>
      <h2>{item.name}</h2>
      <p>Description: {item.description}</p>
      <p>Starting Bid: ${item.startingBid.toFixed(2)}</p>
      <p>Current Bid: ${item.currentBid.toFixed(2)}</p>
      <p>Seller: {item.seller.username}</p>
      <p>End Time: {new Date(item.endTime).toLocaleString()}</p>
      {isSeller ? (
        <p>You cannot bid on your own item.</p>
      ) : (
        <form onSubmit={handleBidSubmit}>
          <input
            type="number"
            value={bidValue}
            min={item.currentBid + 1}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Place Bid</button>
        </form>
      )}
    </div>
  );
};

export default ProductItem;
