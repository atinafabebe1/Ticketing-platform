import React from 'react';

const OrderQuantityForm = ({ ticketQuantity, handleTicketQuantityChange, handleOrderClick }) => {
  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 w-full sm:w-96`}>
      <h2 className="text-2xl font-semibold mb-4">Select Ticket Quantity</h2>
      <label htmlFor="ticketQuantity" className="block mb-2">
        Quantity:
      </label>
      <select
        id="ticketQuantity"
        value={ticketQuantity}
        onChange={handleTicketQuantityChange}
        className="border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
        <option value={6}>6</option>
      </select>
      <button onClick={handleOrderClick} className="mt-4 bg-blue text-white px-4 py-2 rounded-md hover:bg-blue w-full">
        Continue to Order
      </button>
    </div>
  );
};

export default OrderQuantityForm;
