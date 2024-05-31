import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ITEMS } from '../graphql/queries';
import MiniItem from '../components/MiniItem';

const ItemList = () => {
  const { data, loading, error, refetch } = useQuery(GET_ITEMS);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading items for sale: {error.message}</div>;

  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredItems = data.items.filter(item => {
    const matchesSearchTerm = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMinPrice = minPrice === '' || item.currentBid >= parseFloat(minPrice);
    const matchesMaxPrice = maxPrice === '' || item.currentBid <= parseFloat(maxPrice);
    return matchesSearchTerm && matchesMinPrice && matchesMaxPrice;
  });

  return (

    <div className="container mt-4">
      <h1 className="mb-4">All Items for Sale</h1>
      <div className="mb-4 d-flex flex-wrap justify-content-start align-items-center">
        <input
          type="text"
          className="form-control me-2 mb-2"

          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearchTermChange}
          style={{ maxWidth: '200px' }}
        />
        <input
          type="number"

          className="form-control me-2 mb-2"

          placeholder="Min price"
          value={minPrice}
          onChange={handleMinPriceChange}
          style={{ maxWidth: '150px' }}
        />
        <input
          type="number"

          className="form-control mb-2"

          placeholder="Max price"
          value={maxPrice}
          onChange={handleMaxPriceChange}
          style={{ maxWidth: '150px' }}
        />
      </div>

      <div className="row">
        {filteredItems.map(item => (
          <div key={item.id} className="col-lg-4 col-md-6 mb-4">
            <MiniItem item={item} refetch={refetch} />
          </div>
        ))}
      </div>

    </div>
  );
};

export default ItemList;
