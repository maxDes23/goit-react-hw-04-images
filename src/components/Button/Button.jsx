import React from 'react';

const Button = ({ onClick }) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <button className="Button" onClick={handleClick}>
      Load more
    </button>
  );
};

export default Button;
