import React, { useState, useEffect } from 'react';
import axios from 'axios';

import EventCard from './EventCard';
import Icon from '../common/Icon/MoreEvents.jsx';
import PreviousIcon from '../common/Icon/PreviousIcon.jsx';
import api from '../../api/api';

const EventList = ({ category }) => {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [limit, setLimit] = useState(getLimit());

  function getLimit() {
    if (window.innerWidth >= 1024) {
      return 4; // Large screens
    } else if (window.innerWidth >= 768) {
      return 3; // Medium screens
    } else {
      return 2; // Small screens
    }
  }

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`/events?genre=${category.toLowerCase()}&limit=${limit}&page=${currentPage}`);
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
  }, [category, currentPage, limit]);

  useEffect(() => {
    function handleResize() {
      setLimit(getLimit());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const loadNextEvents = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const loadPrevEvents = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="px-4 py-8 ">
      <h2 className="text-3xl font-semibold mb-6 px-2">{category}</h2>
      <div className="relative">
        <div className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10">
          <PreviousIcon onClick={loadPrevEvents} className="text-2xl text-gray-600 hover:text-gray-800 cursor-pointer" />
        </div>
        <div className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10">
          <Icon onClick={loadNextEvents} className="text-2xl text-gray-600 hover:text-gray-800 cursor-pointer" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {isLoading ? (
            // Placeholder for loading
            <div className="w-full animate-pulse border border-gray-300 p-4 rounded-md">
              <div className="h-20 bg-gray-100 mb-2"></div>
              <div className="h-4 bg-gray-100"></div>
              <div className="h-4 bg-gray-100 mt-1"></div>
            </div>
          ) : (
            // Display events
            events.map((event) => (
              <div key={event._id} className="w-full">
                <EventCard event={event} />
              </div>
            ))
          )}
        </div>
      </div>
      {isLoading && <p className="text-center mt-4">Loading...</p>}
    </div>
  );
};

export default EventList;
