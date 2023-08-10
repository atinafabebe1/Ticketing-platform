import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/api';
import TicketsTable from '../components/Tickets/TicketTable';
import { useNavigate } from 'react-router-dom';

function Tickets() {
  const { eventId } = useParams(); // event ID from the URL params
  const [event, setEvent] = useState({});
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`/events/${eventId}/tickets?eventId:${eventId}`)
      .then((response) => {
        console.log(response.data.data);
        setTickets(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const handleAddticket = (eventId) => {
    navigate(`/events/${eventId}/tickets/add`);
  };

  return (
    <div className="px-8 p-4">
      <div className="mb-4 flex justify-between items-center py-2 ">
        <h1 className="text-xl font-semibold">Tickets</h1>
        <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md" onClick={(eventId) => handleAddticket(eventId)}>
          Add New Event
        </button>
      </div>

      <TicketsTable tickets={tickets} />
    </div>
  );
}

export default Tickets;
