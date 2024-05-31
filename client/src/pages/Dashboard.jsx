import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useQuery } from '@apollo/client';
import { GET_USER_DETAILS } from '../graphql/queries';
import AddProduct from "../pages/AddProduct";
import Item from '../components/Item'; // Import the Item component
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
    <section>
      <div className="dashboard">
        <div className="dash-container">
            <div className="user-card">
              <h3>Hi, {user.username}</h3>
              <h5>What are you looking for today?</h5>
            </div>

            <aside className="categories-table">
              {/* Add your categories here */}
            </aside>
          </div>
          <div className='right-column'>
            <h2>Looking to Sell Some Products On Our Site?</h2>
            <button onClick={() => setIsModalOpen(true)}>Sell Product</button>
          </div>
        </div>
      </div>

      <div className='user-sales-bids-section'>
        <div id='items-col-1' className='d-flex flex-column align-items-center'>
          <h2>Items for Sale</h2>
          {userDetails?.itemsForSale.length ? (
            <ul className="d-flex flex-column align-items-center justify-content-center">
              {userDetails.itemsForSale.map(item => (
                <Item key={item.id} item={item} refetch={refetch} dashboardStyle />
              ))}
            </ul>
          ) : (
            <p>No items for sale.</p>
          )}
        </div>

        <div id='items-col-2'>
          <h2>Your Bids</h2>
          {highestBids.length ? (
            <ul>
            {highestBids.filter(bid => !bid.item.isCompleted).map(bid => (
                <MiniItem key={bid.item.id} item={bid.item} refetch={refetch} />
              ))}
            </ul>
          ) : (
            <p>No bids placed.</p>
          )}
        </div>

        <div id='items-col-3'>
          <h2>Items Won</h2>
          {userDetails?.itemsWon
                .filter(item => item.isCompleted && item.highBidder.id === user.id).length ? (
            <ul>
              {userDetails.itemsWon
                .filter(item => item.isCompleted && item.highBidder.id === user.id)
                .map(item => (
                  <Item key={item.id} item={item} refetch={refetch} dashboardStyle />
                ))}
            </ul>
          ) : (
            <p>No items won.</p>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setIsModalOpen(false)}>&times;</span>
            <ProductForm refetch={refetch} />
          </div>
        </div>
      )}
    </section>
  );
}

export default Dashboard;
