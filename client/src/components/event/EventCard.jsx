import React from 'react';
import ImageCard from '../common/ImageCards/ImageCards';
import SeeTicketButton from '../common/Button/SeeTickets';

function EventCard({ imageSrc, title, description }) {
  return (
    <div className="w-full md:w-full p-2 mx-auto mb-6">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="relative">
          <ImageCard src={imageSrc} alt="Event" />
          <div className="absolute bottom-0 left-0 p-4 bg-black bg-opacity-50 text-white">
            <h2 className="text-xl font-semibold">{title}</h2>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center mb-3">
            <div className="flex-grow">
              <p className="text-gray-700">{description}</p>
            </div>
            <SeeTicketButton />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
