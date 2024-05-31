import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ITEMS } from '../graphql/queries';
import Item from '../components/Item';
import FileUpload from '../components/FileUpload';

const ItemList = () => {
  const { data, loading, error } = useQuery(GET_ITEMS);
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
    <div>
      <h1>All Items for Sale</h1>
      <div className=" p-3">
        <input
          type="text"
          className=" bg-dark-subtle border-0 rounded p-2 m-3"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
        <input
          type="number"
          className=" bg-dark-subtle border-0 rounded p-2 m-3"
          placeholder="Min price"
          value={minPrice}
          onChange={handleMinPriceChange}
        />
        <input
          type="number"
          className=" bg-dark-subtle border-0 rounded p-2 m-3"
          placeholder="Max price"
          value={maxPrice}
          onChange={handleMaxPriceChange}
        />
      </div>
      <ul className="d-flex flex-column align-items-center">
        {filteredItems.map(item => (
          <Item key={item.id} item={item}/>
        ))}
      </ul>
      <FileUpload />
    </div>
  );
};

export default ItemList;