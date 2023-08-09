import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register, reset } from '../../features/auth/authSlice';
import { FaSpinner } from 'react-icons/fa';

import Logo from '.././../assets/img/logoS.png';

function CreateAccount() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    userName: '',
    password: '',
    phoneNumber: '',
    location: '',
    role: 'user'
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, message, isLoading, isSucess, isError } = useSelector((state) => {
    return state.auth;
  });
  useEffect(() => {
    dispatch(reset());
  }, []);

  useEffect(() => {
    if (isSucess) {
      navigate('/signin');
    }
  }, [user, isError, isSucess, isLoading, navigate, dispatch, message]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(register(formData));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-lightGray">
      <div className="max-w-sm w-full p-6 bg-white rounded-lg shadow-lg">
        <Link to="/">
          <div className="flex flex-col items-center mb-2">
            <img src={Logo} alt="Logo" className="w-28 h-10 mb-2" />
            <h2 className="text-2xl font-semibold text-mediumGray">Create an Account</h2>
          </div>
        </Link>
        <div className="text-center mt-2">
          <Link to="/organizer-register" className="text-blue">
            Are you an event organizer? Register here
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-4 mt-8">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block font-semibold mb-1 text-mediumGray">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                placeholder="Your first name"
                value={formData.firstName}
                onChange={handleChange}
                className={`p-3 border rounded-lg w-full focus:outline-none focus:ring focus:ring-blue-500 ${
                  isError ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block font-semibold mb-1 text-mediumGray">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                placeholder="Your last name"
                value={formData.lastName}
                onChange={handleChange}
                className={`p-3 border rounded-lg w-full focus:outline-none focus:ring focus:ring-blue-500 ${
                  isError ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block font-semibold mb-1 text-mediumGray">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Your email"
              value={formData.email}
              onChange={handleChange}
              className={`p-3 border rounded-lg w-full focus:outline-none focus:ring focus:ring-blue-500 ${
                isError ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            />
          </div>

          <div>
            <label htmlFor="userName" className="block font-semibold mb-1 text-mediumGray">
              Username
            </label>
            <input
              type="text"
              id="userName"
              placeholder="Your username"
              value={formData.userName}
              onChange={handleChange}
              className={`p-3 border rounded-lg w-full focus:outline-none focus:ring focus:ring-blue-500 ${
                isError ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block font-semibold mb-1 text-mediumGray">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Your password"
              value={formData.password}
              onChange={handleChange}
              className={`p-3 border rounded-lg w-full focus:outline-none focus:ring focus:ring-blue-500 ${
                isError ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            />
          </div>

          <div>
            <label htmlFor="phoneNumber" className="block font-semibold mb-1 text-mediumGray">
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              placeholder="Your phone number"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={`p-3 border rounded-lg w-full focus:outline-none focus:ring focus:ring-blue-500 ${
                isError ? 'border-red-500' : 'border-gray-300'
              }`}
            />
          </div>

          <div>
            <label htmlFor="location" className="block font-semibold mb-1 text-mediumGray">
              Location
            </label>
            <input
              type="text"
              id="location"
              placeholder="Your location"
              value={formData.location}
              onChange={handleChange}
              className={`p-3 border rounded-lg w-full focus:outline-none focus:ring focus:ring-blue-500 ${
                isError ? 'border-red-500' : 'border-gray-300'
              }`}
            />
          </div>

          {isError && <p className="text-red-500 mb-4">{message}</p>}
          {isSucess && <p className="text-green-500 mb-4">{message}</p>}

          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className={`block w-full text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring ${
                isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-blue focus:ring-primary'
              }`}
              disabled={isLoading}
            >
              {isLoading ? <FaSpinner className="animate-spin inline-block mr-2" /> : 'Register'}
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          <Link to="/signin" className="text-blue">
            Already have an account? Log in here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
