import React from 'react';

const Spinner = ({ color = 'white', size = '20px' }) => {
  return (
    <div
      className="animate-spin rounded-full border-2 border-t-2 ease-linear"
      style={{
        width: size,
        height: size,
        borderColor: color,
        borderTopColor: 'transparent',
      }}
    ></div>
  );
};

export default Spinner;
