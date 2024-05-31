import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useQuery } from '@apollo/client';
import { GET_USER_DETAILS } from '../graphql/queries';
import ProductForm from "../components/ProductForm";
import ImageSlider from "../components/Carousel";
import Item from '../components/Item'; // Import the Item component

function Dashboard() {
  const { user } = useAuth();
  const [userDetails, setUserDetails] = useState(null);

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
        {/* <div className="carousel-container">
          <ImageSlider />
        </div> */}
        <div className="dash-container">
          <div className="left-column">
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
            <ProductForm refetch={refetch} />
          </div>
        </div>
      </div>

      <div className='user-sales-bids-section'>
        <div id='items-col-1'>
          <h2>Items for Sale</h2>
          {userDetails?.itemsForSale.length ? (
            <ul>
              {userDetails.itemsForSale.map(item => (
                <Item key={item.id} item={item} refetch={refetch} />
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
              {highestBids.map(bid => (
                <Item key={bid.item.id} item={bid.item} refetch={refetch} />
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
                  <Item key={item.id} item={item} refetch={refetch} />
                ))}
            </ul>
          ) : (
            <p>No items won.</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../context/AuthContext';

// import { useQuery } from '@apollo/client';
// import { GET_USER_DETAILS } from '../graphql/queries';


// import ProductForm from "../components/ProductForm"

// import ImageSlider from "../components/Carousel"

// function Dashboard() {


//     const { user } = useAuth();

//     const [userDetails, setUserDetails] = useState(null);

//     const { data, loading, error } = useQuery(GET_USER_DETAILS, {
//       variables: { id: user?.id },
//       skip: !user,
//       onCompleted: (data) => {
//         if (data?.user) {
//           setUserDetails(data.user);
//         }
//       }
//     });

//     useEffect(() => {
//         if (user && !userDetails) {
//           // Fetch user details if user exists but details are not yet fetched
//           setUserDetails(null);  // Reset userDetails to trigger the loading state
//         }
//       }, [user]);
    
//       if (loading) return <div>Loading...</div>;
//       if (error) return <div>Error loading user details</div>;

//     return(
// <section>
// <div className="dashboard">
//   <div className="carousel-container">
//     <ImageSlider />
//   </div>
//   <div className="dash-container">
//     <div className="left-column">
//       <div className="user-card">
//         <h3>Hi, {user.username}</h3>        
//         <h5>What are you looking for today?</h5>
//       </div>

//         <aside className="categories-table">
//           <a className="categories-item" href="/">Category</a>
//           <a className="categories-item" href="/">Category</a>
//           <a className="categories-item" href="/">Category</a>
//           <a className="categories-item" href="/">Category</a>
//           <a className="categories-item" href="/">Category</a>
//           <a className="categories-item" href="/">Category</a>
//           <a className="categories-item" href="/">Category</a>
//           <a className="categories-item" href="/">Category</a>
//           <a className="categories-item" href="/">Category</a>
//           <a className="categories-item" href="/">Category</a>
//         </aside>
//     </div>
//     <div className='right-column'>
//     <h2>Looking to Sell Some Products On Our Site?</h2>
//       <ProductForm />
//     </div>
//   </div>
// </div>
//   <div className='user-sales-bids-section'>
//     <div id='items-col-1'>
//       <h2>Items for Sale</h2>
//       {userDetails?.itemsForSale.length ? (
//         <ul>
//           {userDetails.itemsForSale.map(item => (
//             <li key={item.id}>
//               <h3>{item.name}</h3>
//               <p>{item.description}</p>
//               <p>Starting Bid: {item.startingBid}</p>
//               <p>Current Bid: {item.currentBid}</p>
//               <p>Ends: {new Date(item.endTime).toLocaleString()}</p>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No items for sale.</p>
//       )}
//     </div>

//     <div id='items-col-2'>
//       <h2>Your Bids</h2>
//       {userDetails?.bids.length ? (
//         <ul>
//           {userDetails.bids.map(bid => (
//             <li key={bid.id}>
//               <p>Item: {bid.item.name}</p>
//               <p>Bid Amount: {bid.amount}</p>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No bids placed.</p>
//       )}
//     </div>

//     <div id='items-col-3'>
//       <h2>Items Won</h2>
//       {userDetails?.itemsWon.length ? (
//         <ul>
//           {userDetails.itemsWon.map(item => (
//             <li key={item.id}>
//               <h3>{item.name}</h3>
//               <p>{item.description}</p>
//               <p>Winning Bid: {item.currentBid}</p>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No items won.</p>
//       )}
//     </div>
//   </div>
// </section>
//     )
// }

// export default Dashboard