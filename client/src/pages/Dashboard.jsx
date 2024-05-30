import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

import { useQuery } from '@apollo/client';
import { GET_USER_DETAILS } from '../graphql/queries';


import ProductForm from "../components/ProductForm"

import ImageSlider from "../components/Carousel"

function Dashboard() {


    const { user } = useAuth();

    const [userDetails, setUserDetails] = useState(null);

    const { data, loading, error } = useQuery(GET_USER_DETAILS, {
      variables: { id: user?.id },
      skip: !user,
      onCompleted: (data) => {
        if (data?.user) {
          setUserDetails(data.user);
        }
      }
    });

    useEffect(() => {
        if (user && !userDetails) {
          // Fetch user details if user exists but details are not yet fetched
          setUserDetails(null);  // Reset userDetails to trigger the loading state
        }
      }, [user]);
    
      if (loading) return <div>Loading...</div>;
      if (error) return <div>Error loading user details</div>;

    return(

        <section className="dashboard">
  <div className="dash-container">
    <div className="left-column">
      <h2>Hi, {user.username}</h2>        
        <p>What would you like to do?</p>
      </div>
      <h2>Items for Sale</h2>
      {userDetails?.itemsForSale.length ? (
        <ul>
          {userDetails.itemsForSale.map(item => (
            <li key={item.id}>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p>Starting Bid: {item.startingBid}</p>
              <p>Current Bid: {item.currentBid}</p>
              <p>Ends: {new Date(item.endTime).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No items for sale.</p>
      )}

      <h2>Your Bids</h2>
      {userDetails?.bids.length ? (
        <ul>
          {userDetails.bids.map(bid => (
            <li key={bid.id}>
              <p>Item: {bid.item.name}</p>
              <p>Bid Amount: {bid.amount}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No bids placed.</p>
      )}

      <h2>Items Won</h2>
      {userDetails?.itemsWon.length ? (
        <ul>
          {userDetails.itemsWon.map(item => (
            <li key={item.id}>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p>Winning Bid: {item.currentBid}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No items won.</p>
      )}
      <aside className="categories-table">
        <a className="categories-item" href="/">Category</a>
        <a className="categories-item" href="/">Category</a>
        <a className="categories-item" href="/">Category</a>
        <a className="categories-item" href="/">Category</a>
        <a className="categories-item" href="/">Category</a>
        <a className="categories-item" href="/">Category</a>
        <a className="categories-item" href="/">Category</a>
        <a className="categories-item" href="/">Category</a>
        <a className="categories-item" href="/">Category</a>
        <a className="categories-item" href="/">Category</a>
      </aside>
    </div>
    <div className="carousel-container">
      <ImageSlider />
    </div>

    <ProductForm />

</section>

    )
}

export default Dashboard