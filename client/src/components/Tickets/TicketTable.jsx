import React from 'react';

const TicketsTable = ({ tickets }) => (
  <div>
    {tickets.length === 0 ? (
      <p>No tickets to display.</p>
    ) : (
      <table className="w-full mt-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4">Ticket Type</th>
            <th className="py-2 px-4">Price</th>
            <th className="py-2 px-4">Quantity</th>
            <th className="py-2 px-4">Edit</th>
            <th className="py-2 px-4">Delete</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id}>
              <td className="py-2 px-4">{ticket.type}</td>
              <td className="py-2 px-4">${ticket.price}</td>
              <td className="py-4 px-6">
                <button className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition-colors" onClick={toggleTickets}>
                  See Tickets
                </button>
              </td>
              <td className="py-4 px-6">
                <button className="bg-blue text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors" onClick={() => onEdit(event)}>
                  Edit
                </button>
              </td>
              <td className="py-4 px-6">
                <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors" onClick={() => onDelete(event.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
);

export default TicketsTable;
