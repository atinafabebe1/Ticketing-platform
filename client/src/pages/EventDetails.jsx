import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import jwt_decode from 'jwt-decode';
import TicketsTable from '../components/Tickets/TicketTable';
import api from '../api/api';
import { gregorianToEthiopian } from '../helper/ethiopianCalenderConverter';

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [ticketCount, setTicketCount] = useState(0);
  const [tickets, setTickets] = useState([]);
  const [userRole, setUserRole] = useState('');
  const userToken = useSelector((state) => state.auth.user);

  useEffect(() => {
    fetchEventDetails();
    fetchTickets();
    fetchTicketCount();
  }, [id]);

  const fetchEventDetails = async () => {
    try {
      const response = await api.get(`/events?_id=${id}`);
      setEvent(response.data.data[0]);
    } catch (error) {
      console.error('Error fetching event details:', error);
    }
  };

  const fetchTickets = async () => {
    try {
      const response = await api.get(`/event/${id}/tickets?eventId=${id}`);
      setTickets(response.data.data);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };

  const fetchTicketCount = async () => {
    try {
      const response = await api.get(`/payment/completed?eventId=${id}`);
      setTicketCount(response.data.length);
    } catch (error) {
      console.error('Error fetching ticket count:', error);
    }
  };

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

  if (!event) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-300">
      <div className="my-4">
        <h2 className="text-3xl font-semibold mb-4">{event.title}</h2>
        {event.image && (
          <div className="mt-6">
            <img src={event.image} alt={event.title} className="w-full h-[200px] object-cover rounded-lg" />
          </div>
        )}
        <p className="text-lg text-gray-700 py-6">{event.description}</p>
      </div>

      <div className="my-4 bg-gradient-to-r from-lightOrange p-4 rounded-lg shadow-lg">
        <p className="text-lg text-black">
          <span className="font-semibold">{ticketCount}</span> attendees have already registered for this event.
        </p>
      </div>

      <div className="my-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="md:col-span-3">
          <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-4">Tickets</h3>
            <TicketsTable tickets={tickets} eventId={id} />
          </div>
        </div>

        <div className="mt-8 bg-lightOrange p-6 rounded-lg shadow-md ">
          <h3 className="text-2xl font-semibold mb-4 text-primary ">Event Details</h3>
          <ul className="list-inside list-disc ml-4 text-lg text-gray-700 font-mono">
            <li className="mb-4 mt-2">
              <span className="font-semibold text-gray-900">Date:</span>{' '}
              {gregorianToEthiopian(new Date(event.date).getFullYear(), new Date(event.date).getMonth(), new Date(event.date).getDate())} at{' '}
              {event.time}
            </li>
            <li className="mb-4">
              <span className="font-semibold text-gray-900">Location:</span> {event.location}
            </li>
            <li className="mb-4">
              <span className="font-semibold text-gray-900">Venue:</span> {event.venue}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
