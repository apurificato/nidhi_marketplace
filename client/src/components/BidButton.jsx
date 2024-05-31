import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { PLACE_BID } from '../graphql/mutations';
import { useAuth } from '../context/AuthContext';

const BidButton = ({ item, bidValue, setBidValue }) => {
//   const [bidValue, setBidValue] = useState(item.currentBid + 1);
  const { user } = useAuth();

  const [placeBid] = useMutation(PLACE_BID, {
    onCompleted: () => {
        // Optionally, add logic to refresh the item data or give feedback to the user
      },
    onError: (error) => {
      console.error('Error placing bid:', error);
    },

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
      setBidValue(bidValue + 1);
    } catch (error) {
      console.error('Error placing bid:', error);
    }
  };

  return (
    <form onSubmit={handleBidSubmit}>
      <input
        type="number"
        value={bidValue}
        min={item.currentBid + 1}
        onChange={handleInputChange}
        required
      />
      <button className="btn btn-warning" type="submit">Bid {bidValue}</button>
    </form>
  );
};

export default BidButton;