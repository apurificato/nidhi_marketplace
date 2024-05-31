import React from 'react';
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";
import placeholderImage from '../assets/placeholder.png';

const AuctionImage = ({ imageId, itemName }) => {
  // Initialize Cloudinary instance
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dbpisovxi' // Replace with your Cloudinary cloud name
    }
  });

  const itemImage = imageId ? cld.image(imageId) : null;

  return (
    <div className="item-image">
      {itemImage ? (
        <AdvancedImage
          cldImg={itemImage}
          plugins={[responsive(), placeholder({ mode: 'blur' })]}
          alt={itemName}
        />
      ) : (
        <img src={placeholderImage} alt={itemName} />
      )}
    </div>
  );
};

export default AuctionImage;