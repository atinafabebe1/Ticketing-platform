import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, reset } from '../../features/auth/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { RiGoogleFill } from 'react-icons/ri';
import { FaFacebook, FaSpinner } from 'react-icons/fa';

import Logo from '.././../assets/img/logoS.png';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
    if (isError) {
      console.log(isError);
    }
    console.log('isSucces:', isSucess);
    if (isSucess) {
      dispatch(reset());
      navigate('/');
    }
    console.log(message);
  }, [user, isError, isSucess, isLoading, navigate, dispatch, message]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(login(formData));
    } catch (error) {
      navigate(-1);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-lightGray">
      <div className="max-w-sm w-full p-6 bg-white  shadow-lg">
        <Link to="/">
          <div className="flex flex-col items-center mb-6">
            <img src={Logo} alt="Logo" className="w-28 h-10 mb-2 mb-4" />
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
                isError ? 'border-red-500' : 'border-gray-300'
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
                isError ? 'border-red-500' : 'border-gray-300'
              }`}
            />
          </div>

          {isError && <p className="text-red-500 mb-4">{message}</p>}

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
            className={`block w-full text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring ${
              isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-blue focus:ring-primary'
            }`}
            disabled={isLoading}
          >
            {isLoading ? <FaSpinner className="animate-spin inline-block mr-2" /> : 'Login'}
          </button>
        </form>

        <p className="text-mediumGray text-center py-2">Or</p>

        <div>
          <button
            type="button"
            className={`flex items-center justify-center w-full bg-white text-red-500 font-semibold py-2 px-4 focus:outline-none focus:outline-none border border-red-300 rounded-lg focus:outline-none focus:ring ${
              isLoading ? 'bg-gray-400 cursor-not-allowed' : ''
            }`}
            disabled={isLoading}
          >
            <RiGoogleFill className="mr-2 text-xl" />
            Login with Google
          </button>

          <button
            type="button"
            className={`flex items-center justify-center w-full  bg-blueFacebook my-2 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring ${
              isLoading ? 'bg-gray-400 cursor-not-allowed' : ''
            }`}
            disabled={isLoading}
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
