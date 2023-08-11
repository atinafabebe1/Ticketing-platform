import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api/api';

const OrderDetails = ({ orderInfo }) => {
  const { eventId } = useParams();
  const [ticketInfo, setTicketInfo] = useState(null);

  useEffect(() => {
    const fetchTicketInfo = async () => {
      try {
        const response = await api.get(`/event/${eventId}/tickets?_id=${orderInfo.ticketTypeId}`);
        setTicketInfo(response.data.data[0]);
      } catch (error) {
        console.error('Error fetching ticket information:', error);
      }
    };

    fetchTicketInfo();
  }, [orderInfo.ticketTypeId]);

  return (
    <div className="border border-gray-300 p-4 rounded-lg">
      <h2 className="text-lg font-semibold mb-2">Order Details</h2>
      {ticketInfo ? (
        <>
          <p className="text-gray-700">
            <span className="font-semibold">Ticket Name:</span> {ticketInfo.title}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Quantity:</span> {orderInfo.quantity}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Status:</span> {orderInfo.status}
          </p>
        </>
      ) : (
        <p className="text-red-600">Fetching ticket information...</p>
      )}
    </div>
  );
};

export default OrderDetails;
