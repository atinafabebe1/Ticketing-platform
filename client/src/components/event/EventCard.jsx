import React from 'react';
import ImageCard from '../common/ImageCards/ImageCards';
import SeeTicketButton from '../common/Button/SeeTickets';
import { useNavigate, Link } from 'react-router-dom';

function EventCard({ event, customStyle }) {
  const navigate = useNavigate();

  const handleSeeTicket = (eventId) => {
    navigate(`/event/${eventId}`);
  };

  return (
    <div className="w-full md:w-full p-2 mx-auto mb-6">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <Link to={`/event/${event._id}`}>
          <div className="relative">
            <ImageCard src={event.image} alt="Event" customStyle={customStyle} />
            <div className="absolute bottom-0 left-0 p-2 bg-black bg-opacity-50 text-white">
              <h2 className="text-xl font-semibold">{event.title}</h2>
            </div>
          </div>
        </Link>
        <div className="p-4">
          {' '}
          {/* Increased padding for better spacing */}
          <Link to={`/event/${event._id}`}>
            <p className="text-gray-700">{event.description}</p>
          </Link>
          <div className="flex justify-between items-center mt-4">
            <SeeTicketButton onSeeTicketCick={() => handleSeeTicket(event._id)} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
