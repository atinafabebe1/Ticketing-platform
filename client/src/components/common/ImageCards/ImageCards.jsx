import React from 'react';

function ImageCard({ src, alt, className, customStyle }) {
  return (
    <div className={`w-full rounded-lg overflow-hidden shadow-md ${customStyle}`}>
      <img src={src} alt={alt} className="w-full h-full object-contain" />
    </div>
  );
}

export default ImageCard;
