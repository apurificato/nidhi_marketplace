import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuctionTimer from './AuctionTimer';
import AuctionImage from './AuctionImage';
import BidButton from './BidButton'; // Import the new component
import AcceptBidButton from './AcceptBidButton'; // Import the new component

const MiniItem = ({ item, refetch }) => {
    const [bidValue, setBidValue] = useState(item.currentBid + 1);
    // console.log(item)
    const { user } = useAuth();
    // console.log(user.id)
    // console.log(item.seller.id)
    const isSeller = user.id === item.seller.id;



    return (
        <>
            <div className="item-header">
                <h3>{item.name}</h3>
                <Link to={`/products/${item.id}`}>View Details</Link>
            </div>
            <div className="item-content">
                <AuctionImage imageId={item.imageId} itemName={item.name} />
                <div className="item-details">
                    <p>Seller: {item.seller.username}</p>
                    <p>Current Bid: ${bidValue-1}</p>
                    <p>High Bidder: {item.highBidder?.username || 'None'}</p>
                    <AuctionTimer item={item} />
                </div>
                <div className="item-actions">
                    {isSeller ? (
                        <AcceptBidButton item={item} />
                    ) : (
                        <BidButton item={item} bidValue={bidValue} setBidValue={setBidValue} />
                    )}
                </div>
            </div>
        </>
    );
};

export default MiniItem;