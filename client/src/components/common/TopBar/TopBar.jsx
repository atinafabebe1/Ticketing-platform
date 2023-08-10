import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import jwt_decode from 'jwt-decode';
import { RiArrowDownSLine, RiFootballLine, RiMusic2Line, RiArtboard2Line, RiUserLocationLine, RiCalendar2Line } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { logout, initializeAuth } from '../../../features/auth/authSlice';

const Topbar = () => {
  const [activeLink, setActiveLink] = useState(null);
  const [showSublinks, setShowSublinks] = useState(false);
  const sublinkTimeout = useRef(null);
  const userToken = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [userRole, setUserRole] = useState();

  const links = [
    {
      icon: <RiMusic2Line className="text-xl inline-block mr-2" />,
      label: 'Concerts',
      sublinks: [
        { to: '/concerts/pop', label: 'Pop Concerts' },
        { to: '/concerts/rock', label: 'Rock Concerts' }
      ]
    },
    {
      icon: <RiFootballLine className="text-xl inline-block mr-2" />,
      label: 'Sports',
      sublinks: [
        { to: '/sports/basketball', label: 'Basketball' },
        { to: '/sports/football', label: 'Football' }
      ]
    },
    {
      icon: <RiArtboard2Line className="text-xl inline-block mr-2" />,
      label: 'Theater & Comedy',
      sublinks: [
        { to: '/theater/plays', label: 'Plays' },
        { to: '/theater/comedy', label: 'Comedy Shows' }
      ]
    }
  ];

  useEffect(() => {
    dispatch(initializeAuth());
    console.log(userToken);
  }, [userToken]);

  useEffect(() => {
    if (userToken) {
      try {
        const decodedToken = jwt_decode(userToken);
        setUserRole(decodedToken.role);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, [userToken]);

  const handleLinkHover = (index) => {
    clearTimeout(sublinkTimeout.current);
    setActiveLink(index);
    setShowSublinks(true);
  };

  const handleLinkLeave = () => {
    sublinkTimeout.current = setTimeout(() => {
      setActiveLink(null);
      setShowSublinks(false);
    }, 200);
  };

  useEffect(() => {
    return () => {
      clearTimeout(sublinkTimeout.current);
    };
  }, []);

  return (
    <>
      <Navbar mobileLinks={links} />
      {userToken && userRole === 'user' ? (
        <div>
          <div className="flex items-center justify-between p-2 bg-background text-black md:px-8 md:pt-6">
            <div className="hidden md:flex space-x-6">
              {links.map((link, index) => (
                <div key={index} className="relative group" onMouseEnter={() => handleLinkHover(index)} onMouseLeave={handleLinkLeave}>
                  <button
                    className={`flex items-center text-md font-bold text-mediumGray hover:text-primary focus:outline-none ${
                      activeLink === index ? 'text-primary' : ''
                    }`}
                    role="menuitem"
                  >
                    {link.icon}
                    {link.label}
                    {link.sublinks && (
                      <RiArrowDownSLine className={`ml-1 w-4 h-4 transition-transform transform ${activeLink === index ? 'rotate-180' : ''}`} />
                    )}
                  </button>
                  {link.sublinks && activeLink === index && showSublinks && (
                    <div className="absolute left-0 mt-2 space-y-2 bg-lightGray p-2 rounded-md shadow-md z-10">
                      {link.sublinks.map((sublink, subIndex) => (
                        <Link key={subIndex} to={sublink.to} className="text-sm font-medium text-mediumGray hover:text-primary block px-4 py-2">
                          {sublink.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="hidden md:flex space-x-6">
              <Link to="/location" className="flex items-center text-xs font-normal text-gray-600 hover:text-primary">
                <RiUserLocationLine className="text-xl mr-1" />
                Location
              </Link>
              <div className="flex items-center">
                <label htmlFor="datepicker" className="text-xs font-normal text-gray-600">
                  <RiCalendar2Line className="text-xl mr-1" />
                  Date
                </label>
                <input
                  type="date"
                  id="datepicker"
                  className="ml-1 px-2 py-1 text-xs font-medium rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Topbar;
