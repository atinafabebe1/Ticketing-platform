import React from 'react';
import { IoIosArrowBack } from 'react-icons/io';

const PreviousIcon = ({ onClick }) => {
  return (
    <button className="bg-gray-100 p-2 rounded-full hover:bg-gray-400 transition duration-300" onClick={onClick}>
      <IoIosArrowBack className="text-gray-600 text-3xl" />
    </button>
  );
};

export default PreviousIcon;
