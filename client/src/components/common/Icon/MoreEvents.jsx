import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';

const MoreEvents = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-gray-200 hover:bg-gray-300 focus:bg-gray-300 p-3 rounded-full shadow-md focus:outline-none transition-all duration-300 ease-in-out transform hover:scale-105"
    >
      <IoIosArrowForward className="text-gray-600 text-1xl" />
    </button>
  );
};

export default MoreEvents;
