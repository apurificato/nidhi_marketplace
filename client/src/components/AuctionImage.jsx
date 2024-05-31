import React from 'react';
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";
import placeholderImage from '../assets/placeholder.png';

const AuctionImage = ({ imageId, itemName }) => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dbpisovxi'
    }
  });

  const itemImage = imageId ? cld.image(imageId) : null;

  return (

    <div className="d-flex justify-content-center">

      {itemImage ? (
        <AdvancedImage
        className="item-image"
          cldImg={itemImage}
          plugins={[responsive(), placeholder({ mode: 'blur' })]}
          alt={itemName}
          className="img-fluid"
        />
      ) : (
        <img src={placeholderImage} alt={itemName} className="img-fluid" />
      )}
    </div>
  );
};

export default AuctionImage;
