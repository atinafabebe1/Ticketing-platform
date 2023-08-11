import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';

const AddEvent = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    genre: '',
    image: '',
    venue: ''
  });

  const handleChange = (name) => (e) => {
    const value = name === 'image' ? e.target.files[0] : e.target.value;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let formData = new FormData();
      for (const key in data) {
        formData.append(key, data[key]);
      }

      const res = await api.post(`/events`, formData);

      if (res.status === 200) {
        setData({
          title: '',
          description: '',
          date: '',
          time: '',
          location: '',
          genre: '',
          image: '',
          venue: ''
        });
        navigate('/events');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full sm:w-96">
        <h1 className="text-2xl font-semibold mb-6">Add New Event</h1>
        <form onSubmit={(e) => handleSubmit(e)} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-500"
              type="text"
              id="title"
              name="title"
              value={data.title}
              onChange={handleChange('title')}
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-500"
              id="description"
              name="description"
              value={data.description}
              onChange={handleChange('description')}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <input
                className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-500"
                type="date"
                id="date"
                name="date"
                value={data.date}
                onChange={handleChange('date')}
              />
            </div>
            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                Time
              </label>
              <input
                className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-500"
                type="time"
                id="time"
                name="time"
                value={data.time}
                onChange={handleChange('time')}
              />
            </div>
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-500"
              type="text"
              id="location"
              name="location"
              value={data.location}
              onChange={handleChange('location')}
            />
          </div>
          <div>
            <label htmlFor="genre" className="block text-sm font-medium text-gray-700">
              Genre
            </label>
            <input
              className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-500"
              type="text"
              id="genre"
              name="genre"
              value={data.genre}
              onChange={handleChange('genre')}
            />
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Image
            </label>
            <input
              className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-500"
              type="file"
              accept="image/*"
              id="image"
              name="image"
              onChange={handleChange('image')}
            />
          </div>
          <div>
            <label htmlFor="venue" className="block text-sm font-medium text-gray-700">
              Venue
            </label>
            <input
              className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-500"
              type="text"
              id="venue"
              name="venue"
              value={data.venue}
              onChange={handleChange('venue')}
            />
          </div>
          <div className="flex space-x-4">
            <button type="submit" className="bg-blue text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
              Save Event
            </button>
            <button type="button" onClick={() => navigate('/events')} className="text-gray-500 hover:text-gray-700">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEvent;
