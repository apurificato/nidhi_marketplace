// Item.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { PLACE_BID, ACCEPT_BID } from '../graphql/mutations';
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";
import placeholderImage from '../assets/placeholder.png';
import { useAuth } from '../context/AuthContext';

const Item = ({ item, refetch, dashboardStyle }) => {
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
      refetch();
    } catch (error) {
      console.error('Error placing bid:', error);
    }
  };

  const calculateTimeRemaining = (endTime) => {
    const now = Date.now();
    const end = endTime * 1000; // Convert Unix timestamp to milliseconds
    const timeDifference = end - now;

    if (timeDifference <= 0) {
      return 'Auction Ended';
    }

    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    return { hours, minutes, seconds };
  };

  const renderTimeRemaining = (timeRemaining) => {
    if (typeof timeRemaining === 'string') {
      return timeRemaining;
    }

    const { hours, minutes, seconds } = timeRemaining;
    let remainingTime = '';

    if (hours > 0) remainingTime += `${hours}h `;
    if (minutes > 0) remainingTime += `${minutes}m `;
    if (seconds > 0) remainingTime += `${seconds}s`;

    return remainingTime.trim() || 'Auction ended';
  };

  const isSeller = user.id === item.seller.id;

  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining(item.endTime));

  const formattedTimeRemaining = renderTimeRemaining(timeRemaining);

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
        refetch();
      } catch (error) {
        console.error('Error accepting bid:', error);
      }
    }
  };

  // Initialize Cloudinary instance
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dbpisovxi' // Replace with your Cloudinary cloud name
    }
  });

  const itemImage = item.imageId ? cld.image(item.imageId).format('auto').quality('auto') : null;

  return (
    <li className={`item bg-light rounded border-2 list-unstyled p-4 ${dashboardStyle ? 'dashboard-item' : ''}`}>
      <div className="item-header d-flex flex-column align-items-start justify-content-center">
        <h3 className="item-title">{item.name}</h3>
        <p>Description: {item.description}</p>
        <Link className="item-link" to={`/products/${item.id}`}>View Details</Link>
      </div>
      <div className="item-content d-flex align-items-center justify-content-center">
        <div className="item-image-container d-flex align-items-center justify-content-center h-100">
          {item.imageId ? (
            <AdvancedImage
              className="item-image"
              cldImg={itemImage}
              plugins={[responsive(), placeholder()]}
              alt={item.name}
            />
          ) : (
            <img className="item-image" src={placeholderImage} alt={item.name} />
          )}
        </div>
        <div className="item-details d-flex flex-column align-items-center justify-content-end ms-3">
          <p>Seller: {item.seller.username}</p>
          <p>Starting Bid: ${item.startingBid.toFixed(2)}</p>
          <p>Current Bid: ${item.currentBid.toFixed(2)}</p>
          <p>High Bidder: {item.highBidder?.username || 'None'}</p>
          <p>Time Remaining: {formattedTimeRemaining}</p>
       
          <div className="item-actions mt-3">
            {isSeller && <button onClick={handleAcceptBid} className="btn btn-dark">Accept Bid</button>}
            {!isSeller && (
              <form onSubmit={handleBidSubmit} className="d-flex">
                <input
                  type="number"
                  value={bidValue}
                  min={item.currentBid + 1}
                  onChange={handleInputChange}
                  required
                  className="form-control me-2"
                />
                <button type="submit" className="btn btn-primary">Place Bid</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </li>
  );
};

export default Item;
