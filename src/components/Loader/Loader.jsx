import React from 'react';
import { Audio } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div className="Loader">
      <Audio
        type="Audio"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={3000}
      />
    </div>
  );
};

export default Loader;
