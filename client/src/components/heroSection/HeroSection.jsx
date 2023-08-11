import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventCard from '../event/EventCard';

function HeroSection() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`http://localhost:3500/api/events?limit=3`);
      const newEvents = response.data?.data || [];
      setEvents(newEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="flex flex-wrap justify-center items-start max-w-screen-xl mx-auto p-4 space-y-4 md:space-y-0 md:flex-row md:justify-between">
      <div className="w-full md:w-9/12 p-2">
        {isLoading ? (
          <div className="animate-pulse bg-gray-300 h-64 w-full"></div>
        ) : (
          <EventCard event={events[0]} className="md:row-span-3 md:h-3/4" />
        )}
      </div>
      <div className="w-full md:w-3/12 p-2">
        <div className="flex flex-col space-y-4">
          {isLoading ? (
            <div className="animate-pulse bg-gray-300 h-36"></div>
          ) : (
            <>
              <EventCard event={events[1]} />
              <EventCard event={events[2]} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
