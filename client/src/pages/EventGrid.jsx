import React, { useEffect, useState } from 'react';
import api from '../api/api';
import MoreEvents from '../components/common/Icon/MoreEvents';
import EventCard from '../components/event/EventCard';
import { useParams } from 'react-router-dom';

const EventGrid = () => {
  const eventsPerPage = 12;
  const eventsPerRow = 4;
  const { genre } = useParams();
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/events?genre=${genre}&page=${currentPage}&limit=${eventsPerPage}`);
        const newEvents = response.data.data;
        setEvents(newEvents);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching events:', error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, [genre, currentPage]);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderEventCards = () => {
    return events.map((event, index) => (
      <div>
        <div key={event.id} className={`mb-4 ${index % eventsPerRow === 3 ? 'lg:mb-0' : ''} w-full`}>
          <EventCard event={event} />
        </div>
      </div>
    ));
  };

  return (
    <div className="event-grid px-6 pt-8">
      <h1 className="text-3xl font-semibold mb-4 px-2">{genre}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {loading ? <div className="col-span-4">Loading...</div> : renderEventCards()}
      </div>
      <div className="pagination my-4 flex items-center justify-center">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'} text-white rounded`}
        >
          Previous
        </button>
        <span className="mx-4 text-xl">{currentPage}</span>
        <button onClick={nextPage} className={`px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded`}>
          Next
        </button>
      </div>
      {currentPage * eventsPerPage < events.length && <MoreEvents onClick={nextPage} />}
    </div>
  );
};

export default EventGrid;
