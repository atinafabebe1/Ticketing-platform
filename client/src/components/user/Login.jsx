import { useState } from 'react';
import axios from 'axios';
import { RiGoogleFill } from 'react-icons/ri';
import { FaFacebook } from 'react-icons/fa';

import Logo from '.././../assets/img/logoS.png';
import { Link } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/user/login', formData);

      if (response.data.success) {
        setError('');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      setError('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-lightGray">
      <div className="max-w-sm w-full p-6 bg-white rounded-lg shadow-lg">
        <Link to="/">
          <div className="flex flex-col items-center mb-6">
            <img src={Logo} alt="Logo" className="w-28 h-10 mb-2" />
            <h2 className="text-2xl font-semibold text-mediumGray ">Login to YeneTicet</h2>
          </div>
        </Link>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
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
                error ? 'border-red-500' : 'border-gray-300'
              }`}
            />
          </div>

          <div className="mb-4">
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
                error ? 'border-red-500' : 'border-gray-300'
              }`}
            />
          </div>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <div className="flex items-center justify-between mb-4">
            <label htmlFor="remember" className="flex items-center">
              <input type="checkbox" id="remember" className="mr-2 border border-gray-300 rounded focus:ring-primary" />
              <span className="text-mediumGray">Remember me</span>
            </label>
            <a href="#" className="text-blue">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="block w-full bg-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue focus:outline-none focus:ring focus:ring-primary"
          >
            Login
          </button>
        </form>
        <p className="text-mediumGray text-center py-2">Or</p>
        <div>
          <button
            type="button"
            className="flex items-center justify-center w-full bg-white text-black font-semibold py-2 px-4 rounded-lg hover:bg-blue focus:outline-none border border-primary focus:ring focus:ring-primary"
          >
            <RiGoogleFill className="mr-2 text-xl" />
            Login with Google
          </button>

          <button
            type="button"
            className="flex items-center justify-center w-full mt-2 bg-blueFacebook text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue focus:outline-none focus:ring focus:ring-primary"
          >
            <FaFacebook className="mr-2 text-xl" />
            Login with Facebook
          </button>
        </div>
        <div className="flex items-center justify-center mt-4">
          <Link to="/signup" className="text-primary">
            New to Yeneticket? <span className="text-blue">Create Account</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
