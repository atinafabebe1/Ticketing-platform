import React, { useState, useEffect, useCallback } from 'react';
import EventCard from './EventCard';
import Icon from '../common/Icon/MoreEvents.jsx';
import PreviousIcon from '../common/Icon/PreviousIcon.jsx';
import api from '../../api/api';
import ErrorMessage from '../common/error/ErrorMessage';

const EventList = ({ category }) => {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [eventsPerPage, setEventsPerPage] = useState(getLimit());

  // Function to calculate the number of events to fetch based on screen width
  function getLimit() {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1024) {
      return 4; // Large screens
    } else if (screenWidth >= 768) {
      return 3; // Medium screens
    } else {
      return 2; // Small screens
    }
  }

  // Function to fetch events from the API
  const fetchEvents = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await api.get(`/events`, {
        params: {
          genre: category.toLowerCase(),
          limit: eventsPerPage,
          page: currentPage
        }
      });
      const newEvents = response.data?.data || [];
      setEvents(newEvents);
      setError(null);
      setHasNextPage(newEvents.length === eventsPerPage);
    } catch (error) {
      console.error('Error fetching events:', error);
      setError('An error occurred while fetching events.');
    } finally {
      setIsLoading(false);
    }
  }, [category, currentPage, eventsPerPage]);

  // Function to handle window resize
  const handleResize = () => {
    const newEventsPerPage = getLimit();
    setEventsPerPage(newEventsPerPage);
    setCurrentPage(1); // Reset the page when screen size changes
  };

  // Load next page of events
  const loadNextEvents = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  // Load previous page of events
  const loadPrevEvents = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [category, currentPage, eventsPerPage, fetchEvents]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="py-8">
      <h2 className="text-2xl font-semibold mb-4">Upcoming {category}</h2>
      <div className="relative">
        <div className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10">
          <PreviousIcon onClick={loadPrevEvents} />
        </div>
        {hasNextPage && (
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10">
            <Icon onClick={loadNextEvents} />
          </div>
        )}
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {isLoading ? (
            <LoadingPlaceholder />
          ) : error ? (
            <ErrorMessage message={error} />
          ) : events.length > 0 ? (
            events.map((event) => (
              <div key={event._id} className="w-full">
                <EventCard event={event} />
              </div>
            ))
          ) : (
            <p className="text-center mt-4">No events found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

const LoadingPlaceholder = () => (
  <div className="w-full animate-pulse border border-gray-300 p-4 rounded-md">
    <div className="h-20 bg-gray-100 mb-2"></div>
    <div className="h-4 bg-gray-100"></div>
    <div className="h-4 bg-gray-100 mt-1"></div>
  </div>
);

export default EventList;
