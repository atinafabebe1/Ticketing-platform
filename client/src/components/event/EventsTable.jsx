import React from 'react';
import { gregorianToEthiopian } from '../../helper/ethiopianCalenderConverter';

const EventsTable = ({ events, onSeeTickets, onEditEvent, onDeleteEvent }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full bg-white border border-gray-300 shadow-lg rounded-lg">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-6 py-4 text-left">Title</th>
            <th className="px-6 py-4 text-left">Date and Time</th>
            <th className="px-6 py-4 text-left">Location</th>
            <th className="px-6 py-4 text-left">Genre</th>
            <th className="px-6 py-4 text-left">Venue</th>
            <th className="px-6 py-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id} className="hover:bg-gray-100 transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-center space-x-4">
                  <img src={event.image} alt={event.title} className="w-12 h-12 object-cover" />
                  <span className="text-sm font-medium">{event.title}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                {`${gregorianToEthiopian(new Date(event.date).getFullYear(), new Date(event.date).getMonth(), new Date(event.date).getDate())} at ${
                  event.time
                }`}
              </td>
              <td className="px-6 py-4">{event.location}</td>
              <td className="px-6 py-4">{event.genre}</td>
              <td className="px-6 py-4">{event.venue}</td>
              <td className="px-6 py-4 space-x-2">
                <button className="text-sm text-purple-600 hover:text-purple-800" onClick={() => onSeeTickets(event)}>
                  See Tickets
                </button>
                <button className="text-sm text-blue-600 hover:text-blue-800" onClick={() => onEditEvent(event)}>
                  Edit
                </button>
                <button className="text-sm text-red-600 hover:text-red-800" onClick={() => onDeleteEvent(event.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventsTable;
