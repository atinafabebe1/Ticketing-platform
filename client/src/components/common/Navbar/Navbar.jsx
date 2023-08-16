import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, initializeAuth } from '../../../features/auth/authSlice';
import jwt_decode from 'jwt-decode';
import SearchBar from '../Searchbar/Searchbar';
import Logo from '../../../assets/img/logo.png';
import { RiAccountCircleLine, RiLogoutBoxLine, RiTicket2Line, RiDashboard2Line } from 'react-icons/ri';
import { GoGlobe, GoReport } from 'react-icons/go';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userToken = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [userRole, setUserRole] = useState();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to logout?')) {
      dispatch(logout());
      setUserRole(null);
      navigate('/signin');
    }
  };

  const links = {
    user: [
      { to: '/mytickets', label: 'My Tickets', icon: <RiTicket2Line className="text-xl mr-2" /> },
      { to: '/profile', label: 'Profile', icon: <RiAccountCircleLine className="text-xl mr-2" /> },
      { to: '/', label: 'Logout', icon: <RiLogoutBoxLine className="text-xl mr-2" />, onClick: handleLogout }
    ],
    organizer: [
      { to: '/', label: 'Dashboard', icon: <RiDashboard2Line className="text-xl mr-2" /> },
      { to: '/events', label: 'Events' },
      { to: '/reports', label: 'Reports', icon: <GoReport className="text-xl mr-2" /> },
      { to: '/profile', label: 'Profile', icon: <RiAccountCircleLine className="text-xl mr-2" /> },
      { to: '/', label: 'Logout', icon: <RiLogoutBoxLine className="text-xl mr-2" />, onClick: handleLogout }
    ],
    guest: [
      { to: '/', label: 'Language', icon: <GoGlobe className="text-xl mr-2" /> },
      { to: '/sell', label: 'Organizers' },
      { to: '/signin', label: 'Sign In', icon: <RiAccountCircleLine className="text-2xl mr-2" /> }
    ]
  };

  useEffect(() => {
    dispatch(initializeAuth());
  }, [userToken]);

  useEffect(() => {
    if (userToken) {
      try {
        const decodedToken = jwt_decode(userToken);
        setUserRole(decodedToken.role);
      } catch (error) {
        setUserRole(null);
      }
    } else {
      setUserRole(null);
    }
  }, [userToken]);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-background text-black md:px-8">
      <Link to="/">
        <div className="flex items-center space-x-4 mr-2">
          <img src={Logo} alt="Logo" className="sm:w-24 sm:h-18 md:w-32 md:h-26 rounded-full md:mr-8 sm:mr-2" />
          <SearchBar />
        </div>
      </Link>

      {/* Desktop and Mobile Links */}
      <div className="hidden md:flex space-x-6">
        {links[userRole]
          ? links[userRole].map((link, index) => (
              <Link
                key={index}
                to={link.to}
                className="flex items-center text-md font-bold text-mediumGray hover:text-primary"
                onClick={link.onClick}
              >
                {link.icon}
                {link.label}
              </Link>
            ))
          : links.guest.map((link, index) => (
              <Link key={index} to={link.to} className="flex items-center text-md font-bold text-mediumGray hover:text-primary">
                {link.icon}
                {link.label}
              </Link>
            ))}
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <button className="hamburger" onClick={toggleMenu} aria-label="Toggle Menu" aria-expanded={isMenuOpen}>
          <div className={`hamburger-top ${isMenuOpen ? 'open' : ''}`} />
          <div className={`hamburger-middle ${isMenuOpen ? 'open' : ''}`} />
          <div className={`hamburger-bottom ${isMenuOpen ? 'open' : ''}`} />
        </button>

        {isMenuOpen && (
          <div
            className="absolute top-35 left-0 right-0 bg-lightGray p-4 rounded-lg shadow-md flex flex-col items-center mt-8 border border-gray-300 z-50"
            role="menu"
            aria-label="Mobile Menu"
          >
            {links[userRole]
              ? links[userRole].map((link, index) => (
                  <Link key={index} to={link.to} className="block my-4 text-md font-medium text-mediumGray hover:text-primary">
                    {link.icon}
                    {link.label}
                  </Link>
                ))
              : links.guest.map((link, index) => (
                  <Link key={index} to={link.to} className="block my-4 text-md font-medium text-mediumGray hover:text-primary">
                    {link.icon}
                    {link.label}
                  </Link>
                ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
