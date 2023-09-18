import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import api from '../../../api/api';
import { Link } from 'react-router-dom'; // Import Link from React Router

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchQuery) {
      updateSearchResults(searchQuery);
    }
  }, [searchQuery]);

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
  };

  const updateSearchResults = async (query) => {
    setLoading(true);
    try {
      const response = await api.get(`/events?search=${query}`);
      setSearchResults(response.data.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
  };
  const clearSearchResults = () => {
    setSearchResults([]);
    setSearchQuery('');
  };

  return (
    <div className="relative">
      <form onSubmit={handleSearchSubmit} className="w-full sm:w-60 md:w-96">
        <div className="relative flex items-center bg-gray-100 h-12 rounded-full p-2 border-black">
          <span className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <FaSearch className="text-primary" size={20} />
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            className="block w-full h-full pl-12 pr-4 rounded-full bg-gray-100 placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300"
            placeholder="Search Events..."
            aria-label="Search events"
          />
        </div>
      </form>

      {searchResults.length > 0 && (
        <div className="absolute top-14 left-0 w-full bg-white border rounded shadow-lg mt-2 z-10">
          <ul className="space-y-2">
            {searchResults.map((result) => (
              <li
                key={result._id}
                className="hover:bg-gray-100 rounded p-2"
                onClick={clearSearchResults} // Add this click handler
              >
                {/* Use Link to navigate to EventDetails */}
                <Link to={`/event/${result._id}`}>
                  <div className="font-semibold">{result.title}</div>
                  <div className="text-sm text-gray-600">
                    {result.genre} - {result.location}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
