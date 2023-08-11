import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import jwt_decode from 'jwt-decode';

import TicketsTable from '../components/Tickets/TicketTable';
import api from '../api/api';

function Tickets() {
  const { eventId } = useParams(); // event ID from the URL params
  const [event, setEvent] = useState({});
  const [tickets, setTickets] = useState([]);
  const [userRole, setUserRole] = useState();
  const userToken = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const fetchTicket = async () => {
    api
      .get(`/event/${eventId}/tickets?eventId=${eventId}`)
      .then((response) => {
        setTickets(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchTicket();
  }, []);

  useEffect(() => {
    if (userToken) {
      try {
        const decodedToken = jwt_decode(userToken);
        setUserRole(decodedToken.role);
      } catch (error) {
        console.log(error);
      }
    }
  }, [userToken]);

  const handleAddticket = (eventId) => {
    navigate(`/event/${eventId}/tickets/add`);
  };

  return (
    <div className="px-8 p-4">
      <div className="mb-4 flex justify-between items-center py-2 ">
        <h1 className="text-xl font-semibold">Tickets</h1>
        {userRole === 'organizer' && (
          <>
            <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md" onClick={() => handleAddticket(eventId)}>
              Add New Ticket
            </button>
          </>
        )}
      </div>

      <TicketsTable tickets={tickets} eventId={eventId} />
    </div>
  );
}

export default Tickets;
