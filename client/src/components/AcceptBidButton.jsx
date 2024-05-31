import React from 'react';
import { useMutation } from '@apollo/client';
import { ACCEPT_BID } from '../graphql/mutations';
import { useAuth } from '../context/AuthContext';

const AcceptBidButton = ({ item }) => {
  const { user } = useAuth();

  const [acceptBid] = useMutation(ACCEPT_BID, {
    onError: (error) => {
      console.error('Error accepting bid:', error);
    }
  });

  const handleAcceptBid = async () => {
    const confirmation = window.confirm('Are you sure? This will end the auction.');
    if (confirmation) {
      try {
        await acceptBid({
          variables: {
            userId: user.id,
            itemId: item.id
          }
        });
        
      } catch (error) {
        console.error('Error accepting bid:', error);
      }
    }
  };

  return (
    <button onClick={handleAcceptBid}>
      Accept Bid
    </button>
  );
};

export default AcceptBidButton;