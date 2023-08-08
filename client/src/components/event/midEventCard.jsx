import React from 'react';
import MidImageCard from '../common/ImageCards/midImage';
import SeeTicketButton from '../common/Button/SeeTickets';

function MidEventCard({ imageSrc, title, description }) {
  return (
    <div className="w-full md:w-full p-2 mx-auto mb-6 h-175">
      <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
        <div className="relative h-full">
          <MidImageCard src={imageSrc} alt="Event" />
          <div className="absolute bottom-0 left-0 p-4 bg-black bg-opacity-50 text-white">
            <h2 className="text-xl font-semibold">{title}</h2>
          </div>
        </div>
        <div className="p-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <p className="text-gray-600 mt-2">{description}</p>
          </div>
          <SeeTicketButton />
        </div>
      </div>
    </div>
  );
}

export default MidEventCard;
