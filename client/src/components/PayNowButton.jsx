import React from 'react';
// import { useMutation } from '@apollo/client';
// import { ACCEPT_BID } from '../graphql/mutations';
import { useAuth } from '../context/AuthContext';

const PayNowButton = ({ item }) => {
  const { user } = useAuth();



  const handlePayNow= async () => {
    const confirmation = window.confirm('Pay now?');
    if (confirmation) {
      try {
        
        
      } catch (error) {
        console.error('Error accepting bid:', error);
      }
    }
  };

  return (
    <button onClick={handlePayNow}>
      Pay Now
    </button>
  );
};

export default PayNowButton;