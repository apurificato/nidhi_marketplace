import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { PLACE_BID, ACCEPT_BID } from '../graphql/mutations';
import placeholderImage from '../assets/placeholder.png'; // Import the placeholder image

import { useAuth } from '../context/AuthContext';

const Item = ({ item }) => {
  const [bidValue, setBidValue] = useState(item.currentBid + 1);
  const { user } = useAuth();

  const [placeBid] = useMutation(PLACE_BID, {
    onError: (error) => {
      console.error('Error placing bid:', error);
    }
  });

  const [acceptBid] = useMutation(ACCEPT_BID, {
    onError: (error) => {
      console.error('Error accepting bid:', error);
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

  // Function to calculate time remaining
  const calculateTimeRemaining = (endTime) => {
    const now = Date.now(); // Current timestamp in milliseconds
    const timeDifference = endTime - now; // Difference in milliseconds
  
    // Check if the auction has ended
    if (timeDifference <= 0) {
      console.log('Auction has ended');
      return 'Auction Ended';
    }
  
    // Convert milliseconds to hours, minutes, and seconds
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
  
    console.log('Time remaining:', hours, 'hours', minutes, 'minutes', seconds, 'seconds');
  
    return { hours, minutes, seconds }; // Return an object with hours, minutes, and seconds
  };

  // Function to render time remaining
  const renderTimeRemaining = (timeRemaining) => {
    const { hours, minutes, seconds } = timeRemaining;
    let remainingTime = '';

    if (hours > 0) remainingTime += `${hours}h `;
    if (minutes > 0) remainingTime += `${minutes}m `;
    if (seconds > 0) remainingTime += `${seconds}s`;

    return remainingTime.trim() || 'Auction ended';
  };
  

console.log(item.seller.id)
  const isSeller = user.id === item.seller.id;
  
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining(item.endTime));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining(item.endTime));
    }, 1000);

    return () => clearInterval(timer);
  }, [item.endTime]);

  const formattedTimeRemaining = renderTimeRemaining(timeRemaining);

  const handleAcceptBid = async () => {
    // Prompt the user with a confirmation message
    const confirmation = window.confirm('Are you sure? This will end the auction.');
    if (confirmation) {
      try {
        // Call the acceptBid mutation
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
    <li className="item">
      <div className="item-header">
        <h3>{item.name}</h3>
        <Link to={`/products/${item.id}`}>View Details</Link>
      </div>
      <div className="item-content">
        <div className="item-image">
          <img src={item.imageURL || placeholderImage} alt={item.name} />
        </div>
        <div className="item-details">
          <p>{item.description}</p>
          <p>Starting Bid: ${item.startingBid.toFixed(2)}</p>
          <p>Current Bid: ${item.currentBid.toFixed(2)}</p>
          <p>Seller: {item.seller.username}</p>
          <p>Time Remaining: {formattedTimeRemaining}</p>
        </div>
        <div className="item-actions">
          {user.id === item.seller.id && <button onClick={handleAcceptBid}>Accept Bid</button>}
          {!isSeller && (
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
      </div>
    </li>
  );
};

export default Item;