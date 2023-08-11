import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const TicketsTable = ({ tickets, onEdit, onDelete, eventId }) => {
  const [userRole, setUserRole] = useState();
  const userToken = useSelector((state) => state.auth.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (userToken) {
      try {
        const decodedToken = jwt_decode(userToken);
        setUserRole(decodedToken.role);
      } catch (error) {
        console.log(error);
      }
    }
  }, [userToken]);

  const handleOrder = (ticketId) => {
    if (userRole !== 'user') {
      navigate('/signin');
      return;
    }
    console.log('navigating');
    navigate(`/event/${eventId}/tickets/${ticketId}/order`);
  };

  return (
    <div className="overflow-x-auto">
      {tickets.length === 0 ? (
        <p className="text-center mt-4 text-gray-500">No tickets to display.</p>
      ) : (
        <table className="w-full mt-4 border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="py-3 px-4">Ticket Title</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Quantity</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket._id} className="border-t border-gray-300">
                <td className="py-3 px-4">{ticket.title}</td>
                <td className="py-3 px-4">{ticket.price} birr</td>
                <td className="py-3 px-4">{ticket.quantity}</td>
                <td className="py-3 px-4 space-x-2">
                  {userRole === 'organizer' && (
                    <>
                      <button className="text-blue hover:underline" onClick={() => onEdit(ticket._id)}>
                        Edit
                      </button>
                      <button className="text-red-500 hover:underline" onClick={() => onDelete(ticket._id)}>
                        Delete
                      </button>
                    </>
                  )}
                  {(!userRole || userRole === 'user') && (
                    <>
                      <button className="text-blue hover:underline" onClick={() => handleOrder(ticket._id)}>
                        order
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TicketsTable;
