import React, { useState, useEffect } from 'react';
import Card from '../common/card/Card';
import api from '../../api/api';
import { Link } from 'react-router-dom';

const OrganizerDashboard = () => {
  const [events, setEvents] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch events and orders data from your API endpoints
    api('/events')
      .then((eventData) => {
        console.log(eventData.data.data);
        setEvents(eventData.data.data);
      })
      .catch((error) => {
        console.error('Error fetching event data:', error);
      });

    api('/orders')
      .then((orderData) => {
        console.log(orderData.data.data);
        setOrders(orderData.data.data);
      })
      .catch((error) => {
        console.error('Error fetching order data:', error);
      });
  }, []);

  // Calculate total events, total tickets sold, and total revenue
  const totalEvents = events.length;
  const totalTicketsSold = orders.reduce((total, order) => total + order.quantity, 0);
  const totalRevenue = orders.reduce((total, order) => total + order.totalAmount, 0);

  return (
    <div className="bg-white min-h-screen py-8 px-4">
      <h1 className="text-4xl font-semibold mb-8 text-center text-blue-700">Organizer Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card title="Event Statistics" className="bg-blue-100 p-6 rounded-lg shadow">
          <p className="text-xl font-semibold text-blue-800">Total Events: {totalEvents}</p>
          <p className="text-xl font-semibold text-blue-800">Total Tickets Sold: {totalTicketsSold}</p>
          <p className="text-xl font-semibold text-blue-800">Total Revenue: ${totalRevenue}</p>
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
    </div>
  );
};

export default OrganizerDashboard;
