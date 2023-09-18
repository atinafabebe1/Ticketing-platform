import React, { useState, useEffect } from 'react';
import Card from '../common/card/Card';
import Chart from '../common/Chart/Chart';
import api from '../../api/api';
import { Link } from 'react-router-dom';

const OrganizerDashboard = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Replace '/api/events' with your actual API endpoint
    api('/events')
      .then((data) => {
        console.log(data.data.data);
        setEvents(data.data.data);
      })
      .catch((error) => {
        console.error('Error fetching event data:', error);
      });
  }, []);

  const totalEvents = events.length;

  const genres = [...new Set(events.map((event) => event.genre))];
  const eventCountsByGenre = genres.map((genre) => events.filter((event) => event.genre === genre).length);

  const chartData = {
    labels: genres,
    values: eventCountsByGenre,
    label: 'Events by Genre'
  };

  return (
    <div className="bg-white min-h-screen py-8 px-4">
      <h1 className="text-4xl font-semibold mb-8 text-center text-blue-700">Organizer Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card title="Event Statistics" className="bg-blue-100 p-6 rounded-lg shadow">
          <p className="text-xl font-semibold text-blue-800">Total Events: {totalEvents}</p>
        </Card>

        <Card title="Upcoming Events" className="bg-green-100 p-6 rounded-lg shadow">
          <ul className="list-disc pl-6 text-lg text-green-800">
            {events.map((event) => (
              <li key={event._id} className="mb-2">
                <Link to={`/event/${event._id}`} className="text-blue-600 hover:underline">
                  {event.title} - {event.date}
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Chart data={chartData} className="mt-8 p-6 bg-white rounded-lg shadow" />
    </div>
  );
};

export default OrganizerDashboard;
