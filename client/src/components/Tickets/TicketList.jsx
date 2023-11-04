import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const TicketList = () => {
  const [ticketOrders, setTicketOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const fetchTicketOrders = () => {
    api
      .get(`/orders/user?limit=${pageSize}`)
      .then((response) => {
        console.log(response.data.data);
        setTicketOrders(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching ticket orders:', error);
      });
  };

  useEffect(() => {
    fetchTicketOrders();
  }, [currentPage, pageSize]);

  return (
    <div className="bg-background p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold mb-6">Your Ticket Orders</h2>
      <ul>
        {ticketOrders.map((order) => (
          <li key={order._id} className="mb-4">
            <div className="bg-white text-mediumGray border p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Order ID: {order._id}</h3>
              <div className="flex justify-between">
                <div>
                  <p>Status: {order.status}</p>
                  <p>Total Amount: ${order.totalAmount}</p>
                </div>
                <div>
                  <p>Quantity: {order.quantity}</p>
                  <p>Ticket Type: {order.ticketTypeId.title}</p>
                </div>
              </div>
              <div className="text-sm text-mediumGray mt-2">
                <p>Event ID: {order.ticketTypeId.eventId}</p>
                <p>Price per Ticket: ${order.ticketTypeId.price}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex justify-center mt-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className={`px-4 py-2 mx-2 rounded-full ${
            currentPage === 1 ? 'bg-mediumGray text-lightGray cursor-not-allowed' : 'bg-blue text-white hover:bg-blueFacebook'
          }`}
          disabled={currentPage === 1}
        >
          <FaAngleLeft className="inline-block mr-2" /> Prev
        </button>
        {Array.from({ length: Math.ceil(ticketOrders.length / pageSize) }).map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 mx-2 rounded-full ${
              currentPage === index + 1 ? 'bg-blue text-white hover:bg-blueFacebook' : 'bg-lightGray text-mediumGray hover:bg-lightOrange'
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className={`px-4 py-2 mx-2 rounded-full ${
            currentPage === Math.ceil(ticketOrders.length / pageSize)
              ? 'bg-mediumGray text-lightGray cursor-not-allowed'
              : 'bg-blue text-white hover:bg-blueFacebook'
          }`}
          disabled={currentPage === Math.ceil(ticketOrders.length / pageSize)}
        >
          Next <FaAngleRight className="inline-block ml-2" />
        </button>
      </div>
    </div>
  );
};

export default TicketList;
