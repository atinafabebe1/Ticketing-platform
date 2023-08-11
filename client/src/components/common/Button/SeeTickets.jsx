import React from 'react';

function SeeTicketButton({ onSeeTicketCick }) {
  return (
    <button
      className="bg-blue text-white text-md px-4 py-2 rounded-md hover:bg-primary-dark flex items-center transition duration-300 ease-in-out transform hover:scale-105"
      onClick={onSeeTicketCick}
    >
      Tickets
    </button>
  );
}

export default SeeTicketButton;
