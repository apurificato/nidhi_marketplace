import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import AuctionTimer from './AuctionTimer';
import AuctionImage from './AuctionImage';
import BidButton from './BidButton'; 
import AcceptBidButton from './AcceptBidButton';
import PayNowButton from './PayNowButton';

const ProductItem = ({ item }) => {
    const [bidValue, setBidValue] = useState(item.currentBid + 1);
    const { user } = useAuth();
    const isSeller = user.id === item.seller.id;
    const isCompleted = item.isCompleted;

    // Sort bids to get the last 5 bids
    const sortedBids = item.bids.slice().sort((a, b) => b.amount - a.amount).slice(0, 5);

    return (
        <div className="card mb-3 mini-item" style={{ minWidth: '350px' }}>
            <div className="card-header d-flex justify-content-between align-items-center">
                <h1 className="mb-0">{item.name}</h1>
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="col-lg-4">
                        <AuctionImage imageId={item.imageId} itemName={item.name} />
                        <p className="mt-3"><strong>Description:</strong> {item.description}</p>
                    </div>
                    <div className="col-lg-4">
                        <p className="mb-1"><strong>Seller:</strong> {item.seller.username}</p>
                        <p className="mb-1"><strong>Current Bid:</strong> ${bidValue - 1}</p>
                        <p className="mb-1"><strong>High Bidder:</strong> {item.highBidder?.username || 'None'}</p>
                        <AuctionTimer item={item} />
                        <div className="text-center mt-3">
                            {isCompleted ? (
                                <PayNowButton item={item} />
                            ) : isSeller ? (
                                <AcceptBidButton item={item} />
                            ) : (
                                <BidButton item={item} bidValue={bidValue} setBidValue={setBidValue} />
                            )}
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <h5>Last 5 Bids</h5>
                        <ul className="list-group">
                            {sortedBids.map(bid => (
                                <li key={bid.id} className="list-group-item d-flex justify-content-between align-items-center">
                                    <span>{bid.user.username}</span>
                                    <span>${bid.amount}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductItem;
