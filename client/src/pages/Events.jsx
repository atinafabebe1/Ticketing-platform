import React, { useState, useEffect } from 'react';
import api from '../api/api';
import EventsTable from '../components/event/EventsTable';
import { useNavigate } from 'react-router-dom';

function Events() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get('/events')
      .then((response) => {
        console.log(response);
        setEvents(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
      });
  }, []);

  const handleAddEvent = () => {
    navigate('/events/add-event');
  };

  const handleEditEvent = (event) => {
    console.log(event);
  };
  const handleDeleteEvent = (event) => {
    console.log(event);
  };
  const handleSeeTicket = (event) => {
    console.log(event);
    navigate(`/events/${event._id}/tickets`);
  };

  return (
    <div className="p-4 px-8 overflow-x-auto">
      <div className="mb-4 flex justify-between items-center py-2 ">
        <h1 className="text-xl font-semibold">Your Events</h1>
        <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md" onClick={() => handleAddEvent()}>
          Add New Event
        </button>
      </div>
      <EventsTable events={events} onSeeTickets={handleSeeTicket} onDeleteEvent={handleDeleteEvent} onEditEvent={handleEditEvent} />
    </div>
  );
}

export default Events;
