import React from 'react';
import ImageCard from '../common/ImageCards/ImageCards';
import SeeTicketButton from '../common/Button/SeeTickets';
import { useNavigate } from 'react-router-dom';

function EventCard({ event }) {
  const navigate = useNavigate();

  const handleSeeTicket = (eventId) => {
    navigate(`/event/${eventId}/tickets`);
  };
  return (
    <div className="w-full md:w-full p-2 mx-auto mb-6">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="relative">
          <ImageCard src={event.image} alt="Event" />
          <div className="absolute bottom-0 left-0 p-2 bg-black bg-opacity-50 text-white">
            <h2 className="text-xl font-semibold">{event.title}</h2>
          </div>
        </div>
        <div className="p-2">
          <div className="flex items-center justify-between">
            <p className="text-gray-700 flex-grow">{event.description}</p>
            <SeeTicketButton onSeeTicketCick={() => handleSeeTicket(event._id)} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
