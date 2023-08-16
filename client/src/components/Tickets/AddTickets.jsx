import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../../api/api';

function AddTickets() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [ticketData, setTicketData] = useState({
    title: '',
    price: '',
    quantity: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTicketData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await api
        .post(`/event/${eventId}/tickets`, ticketData)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });

      navigate(`/event/${eventId}/tickets`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-2 bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full sm:w-96">
        <h1 className="text-2xl font-semibold mb-6">Add New Ticket</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={ticketData.title}
              onChange={handleInputChange}
              className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={ticketData.price}
              onChange={handleInputChange}
              className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={ticketData.quantity}
              onChange={handleInputChange}
              className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div className="flex space-x-4">
            <button type="submit" className="bg-blue text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
              Add Ticket
            </button>
            <Link to={`/events/${eventId}/tickets`} className="text-gray-500 hover:text-gray-700">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTickets;
