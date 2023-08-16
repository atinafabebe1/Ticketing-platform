import React from 'react';

function ImageCard({ src, alt }) {
  return (
    <div className="w-full rounded-lg overflow-hidden shadow-md">
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </div>
  );
}

export default ImageCard;
