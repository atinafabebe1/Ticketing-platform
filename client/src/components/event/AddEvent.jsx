import { useState } from 'react';
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
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="max-w-md mx-auto p-4">
        <div className="mb-4">
          <input
            className="w-full px-3 py-2 border rounded"
            placeholder="Title"
            type="text"
            name="title"
            value={data.title}
            onChange={handleChange('title')}
          />
        </div>
        <div className="mb-4">
          <textarea
            className="w-full px-3 py-2 border rounded"
            placeholder="Description"
            name="description"
            value={data.description}
            onChange={handleChange('description')}
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            className="w-full px-3 py-2 border rounded"
            placeholder="Date"
            type="date"
            name="date"
            value={data.date}
            onChange={handleChange('date')}
          />
          <input
            className="w-full px-3 py-2 border rounded"
            placeholder="Time"
            type="time"
            name="time"
            value={data.time}
            onChange={handleChange('time')}
          />
        </div>
        <div className="mb-4">
          <input
            className="w-full px-3 py-2 border rounded"
            placeholder="Location"
            type="text"
            name="location"
            value={data.location}
            onChange={handleChange('location')}
          />
        </div>
        <div className="mb-4">
          <input
            className="w-full px-3 py-2 border rounded"
            placeholder="Genre"
            type="text"
            name="genre"
            value={data.genre}
            onChange={handleChange('genre')}
          />
        </div>
        <div className="mb-4">
          <input className="w-full px-3 py-2 border rounded" type="file" accept="image/*" name="image" onChange={handleChange('image')} />
        </div>
        <div className="mb-4">
          <input
            className="w-full px-3 py-2 border rounded"
            placeholder="Venue"
            type="text"
            name="venue"
            value={data.venue}
            onChange={handleChange('venue')}
          />
        </div>
        <button type="submit" className={`block w-full bg-primary text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring`}>
          Sumbit
        </button>
      </div>
    </form>
  );
};

export default AddEvent;
