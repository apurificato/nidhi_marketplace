// import React from 'react';
// import { useParams } from 'react-router-dom';
// import { useQuery } from '@apollo/client';
// import { GET_ITEM } from '../graphql/queries';

import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { GET_ITEM } from '../graphql/queries';
import ProductItem from '../components/ProductItem'; // Assuming your component is named ProductItem

function ProductPage() {
  const { id } = useParams();

  const { loading, error, data } = useQuery(GET_ITEM, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { item } = data;
  console.log(item)

  return (
    <section id="product-page" className="container product-page">
      <ProductItem item={item} />
    </section>
  );
}

export default ProductPage;



