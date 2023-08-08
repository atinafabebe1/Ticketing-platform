import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';

const MoreIcon = ({ onClick }) => {
  return (
    <button className="bg-gray-100 p-2 rounded-full hover:bg-gray-400 transition duration-300" onClick={onClick}>
      <IoIosArrowForward className="text-gray-600 text-3xl" />
    </button>
  );
};

export default MoreIcon;
