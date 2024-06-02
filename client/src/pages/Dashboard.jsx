import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useUserData } from '../context/UserDataContext';
import { useQuery } from '@apollo/client';
import { GET_USER_DETAILS } from '../graphql/queries';
import ProductForm from "../components/ProductForm";
import MiniItem from '../components/MiniItem';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function Dashboard() {
  const { user } = useAuth();
  const {userDetails, setUserDetails, loading, error} = useUserData()
  // const [userDetails, setUserDetails] = useState(null);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // const { data, loading, error} = useQuery(GET_USER_DETAILS, {
  //   variables: { id: user?.id },
  //   skip: !user,
  //   onCompleted: (data) => {
  //     if (data?.user) {
  //       setUserDetails(data.user);
  //     }
  //   }
  // });

  // useEffect(() => {
  //   if (user && !userDetails) {
  //     setUserDetails(null);
  //   }
  // }, [user]);

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
        <div className="col-md-4 d-flex justify-content-center py-3">
          <div className="card bg-dark text-light p-3 w-75">
            <h3>Hi, <span className="text-warning">{user.username}</span></h3>
            <h5 className="text-light">What are you looking for today?</h5>
          </div>
        </div>

        <div className="col-md-4 d-flex align-items-center justify-content-center py-3">
          <div className="d-flex flex-column align-items-center card bg-dark text-light p-3">
            <h5 className="text-light">Would you like to buy something?</h5>
            <a className="btn btn-primary w-50" href="/item-sales">Buy Item</a>
          </div>
        </div>

        <div className="col-md-4 d-flex align-items-center justify-content-center py-3">
          <div className="d-flex flex-column align-items-center card bg-dark text-light p-3">
            <h5 className="text-light">Would you like to sell something?</h5>
            <Button variant="success" onClick={handleShow}>
            List Item Now
            </Button>
          </div>
        </div>
      </div>


      <div className="row">
        <div className="col-lg-4 mb-4">
          <h2>Selling</h2>
          {userDetails?.itemsForSale.length ? (
            <ul className="list-unstyled">
              {userDetails.itemsForSale.map(item => (

                <li key={item.id} className="mb-3">
                  <MiniItem item={item} />
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
                  <MiniItem item={bid.item}  />
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
                    <MiniItem item={item}  />
                  </li>
                ))}
            </ul>
          ) : (
            <p>No items won.</p>
          )}
        </div>
      </div>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>List a Product to Sell</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <ProductForm setUserDetails={setUserDetails} handleClose ={handleClose} className="bg-light"/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
}

export default Dashboard;
