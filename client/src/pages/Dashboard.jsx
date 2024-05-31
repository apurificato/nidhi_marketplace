import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useQuery } from '@apollo/client';
import { GET_USER_DETAILS } from '../graphql/queries';
import ProductForm from "../components/ProductForm";
import MiniItem from '../components/MiniItem';

function Dashboard() {
  const { user } = useAuth();
  const [userDetails, setUserDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, loading, error, refetch } = useQuery(GET_USER_DETAILS, {
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
      setUserDetails(null);
    }
  }, [user]);

  const getHighestBids = (bids) => {
    const highestBids = {};

    bids.forEach(bid => {
      const itemId = bid.item.id;
      if (!highestBids[itemId] || highestBids[itemId].amount < bid.amount) {
        highestBids[itemId] = bid;
      }
    });

    return Object.values(highestBids);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading user details</div>;

  const highestBids = userDetails ? getHighestBids(userDetails.bids) : [];

  return (
    <section className="container my-4">
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card p-3">
            <h3>Hi, {user.username}</h3>
            <h5>What are you looking for today?</h5>
          </div>
        </div>
        <div className="col-md-6 d-flex align-items-center justify-content-end">
          <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>Sell Product</button>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-4 mb-4">
          <h2>Selling</h2>
          {userDetails?.itemsForSale.length ? (
            <ul className="list-unstyled">
              {userDetails.itemsForSale.map(item => (
                <li key={item.id} className="mb-3">
                  <MiniItem item={item} refetch={refetch} />
                </li>
              ))}
            </ul>
          ) : (
            <p>No items for sale.</p>
          )}
        </div>

        <div className="col-lg-4 mb-4">
          <h2>Bidding</h2>
          {highestBids.length ? (
            <ul className="list-unstyled">
              {highestBids.filter(bid => !bid.item.isCompleted).map(bid => (
                <li key={bid.item.id} className="mb-3">
                  <MiniItem item={bid.item} refetch={refetch} />
                </li>
              ))}
            </ul>
          ) : (
            <p>No bids placed.</p>
          )}
        </div>

        <div className="col-lg-4 mb-4">
          <h2>Winning</h2>
          {userDetails?.itemsWon
                .filter(item => item.isCompleted && item.highBidder.id === user.id).length ? (
            <ul className="list-unstyled">
              {userDetails.itemsWon
                .filter(item => item.isCompleted && item.highBidder.id === user.id)
                .map(item => (
                  <li key={item.id} className="mb-3">
                    <MiniItem item={item} refetch={refetch} />
                  </li>
                ))}
            </ul>
          ) : (
            <p>No items won.</p>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="modal show d-block" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Sell Product</h5>
                <button type="button" className="close" onClick={() => setIsModalOpen(false)}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <ProductForm refetch={refetch} />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Dashboard;