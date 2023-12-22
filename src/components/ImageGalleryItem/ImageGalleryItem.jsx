import React from 'react';

const ImageGalleryItem = ({ id, webformatURL, onClick }) => {
  const handleClick = () => {
    onClick(webformatURL);
  };

  return (
    <li className="ImageGalleryItem" key={id} onClick={handleClick}>
      <img src={webformatURL} alt="" className="ImageGalleryItem-image" />
    </li>
  );
};

export default ImageGalleryItem;
