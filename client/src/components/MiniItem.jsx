import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuctionTimer from './AuctionTimer';
import AuctionImage from './AuctionImage';
import BidButton from './BidButton'; // Import the new component
import AcceptBidButton from './AcceptBidButton'; // Import the new component
import PayNowButton from './PayNowButton';

const MiniItem = ({ item }) => {
    const [bidValue, setBidValue] = useState(item.currentBid + 1);
    // console.log(item)
    const { user } = useAuth();
    // console.log(user.id)
    // console.log(item.seller.id)
    const isSeller = user.id === item.seller.id;
    const isCompleted = item.isCompleted



    return (
        <>
         <div className="bg-light rounded p-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>{item.name}</h4>
        <Link to={`/products/${item.id}`}>View Details</Link>
      </div>
      <div className="row mb-3">
        <div className="col-12 col-md-4 d-flex justify-content-center">
          <AuctionImage className="d-flex justify-content-center align-items-center" imageId={item.imageId} itemName={item.name} />
        </div>
        <div className="col-12 col-md-4 d-flex flex-column justify-content-center align-items-center">
          <p>Seller: {item.seller.username}</p>
          <p>Current Bid: ${bidValue - 1}</p>
          <p>High Bidder: {item.highBidder?.username || 'None'}</p>
          <AuctionTimer item={item} />
        </div>
        <div className="col-12 col-md-4 d-flex justify-content-center align-items-center">
          {isCompleted ? (
            <PayNowButton item={item} />
          ) : isSeller ? (
            <AcceptBidButton item={item} />
          ) : (
            <BidButton item={item} bidValue={bidValue} setBidValue={setBidValue} />
          )}
        </div>
      </div>
    </div>
        </>
    );
};

export default MiniItem;