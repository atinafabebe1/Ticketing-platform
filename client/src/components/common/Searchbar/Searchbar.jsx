import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log(searchQuery);
  };

  return (
    <form onSubmit={handleSearchSubmit} className="w-full sm:w-80 md:w-96 ">
      <div className="relative flex items-center bg-lightGray h-12 rounded-full">
        <span className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <FaSearch className="text-primary" size={20} />
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          className="block w-full h-full pl-12 pr-4 py-2 rounded-full bg-lightGray placeholder-mediumGray text-mediumGray focus:outline-none focus:ring-2 focus:ring-lightOrange focus:ring-opacity-50 transition-all duration-300"
          placeholder="Search Events..."
          aria-label="Search events"
        />
      </div>
    </form>
  );
};

export default SearchBar;
