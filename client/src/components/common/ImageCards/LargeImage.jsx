import React from 'react';

function LargeImage({ src, alt }) {
  return (
    <div className="w-900 h-500 rounded-lg overflow-hidden shadow-md">
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </div>
  );
}

export default LargeImage;
