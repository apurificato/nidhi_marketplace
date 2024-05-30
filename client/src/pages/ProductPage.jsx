import { GET_ITEM } from '../graphql/queries';
import { useQuery } from '@apollo/client';

function ProductPage({itemId}) {

        const { loading, error, data } = useQuery(GET_ITEM, {
            variables: { id: itemId }
        });

        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :{error.message}</p>;
    
        const { item }  = data;
    

   

        return (
                <section id="product-page" className="product-page">
                  <div>
                    <h1>{item.name}</h1>
                    <img src={item.imageURL} alt={item.name} /> 
                    <p>{item.description}</p>
                    <p>Starting Bid: {item.startingBid}</p>
                    <p>Current Bid: {item.currentBid}</p>
                    <p>Seller: {item.seller.username}</p>
                    <p>High Bidder: {item.highBidder?.username || 'No bids yet'}</p>
                    <p>End Time: {new Date(item.endTime).toLocaleString()}</p>
                  </div>
                </section>
              );
  }
  
  export default ProductPage

