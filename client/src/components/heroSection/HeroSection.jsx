import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import EventCard from '../event/EventCard';

function HeroSection() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEvents = async () => {
    try {
      const response = await api.get('/events?limit=3');
      const newEvents = response.data?.data || [];
      setEvents(newEvents);
    } catch (error) {
      setError('Error fetching events');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const renderEventCards = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-screen w-screen">
          <div className="animate-pulse bg-gray-300 h-64 w-64"></div>
        </div>
      );
    }

    return (
      <div className="flex">
        <div className="w-3/4 pr-4">
          <EventCard event={events[0]} className="w-full" />
        </div>
        <div className="w-1/4 space-y-4">
          <EventCard event={events[1]} className="h-1/2" />
          <EventCard event={events[2]} className="h-1/2" />
        </div>
      </div>
    );
  };

  return (
    <div className="flex justify-center items-start">
      {renderEventCards()}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}

export default HeroSection;
