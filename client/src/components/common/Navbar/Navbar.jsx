import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../Searchbar/Searchbar';
import Logo from '../../../assets/img/logo.png';
import { RiCalendarEventLine, RiAccountCircleLine } from 'react-icons/ri';
import { GoGlobe } from 'react-icons/go';

const Navbar = ({ mobileLinks }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-background text-black md:px-8">
      <Link to="/">
        <div className="flex items-center space-x-4 mr-2">
          <img src={Logo} alt="Logo" className="sm:w-24 sm:h-18 md:w-32 md:h-26  rounded-full md:mr-8 sm:mr-2" />
          <SearchBar />
        </div>
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex space-x-6">
        <Link to="/" className="flex items-center text-md font-bold text-mediumGray hover:text-primary">
          <GoGlobe className="text-xl mr-2 " />
          Language
        </Link>
        <Link to="/sell" className="flex items-center text-md font-bold text-mediumGray hover:text-primary">
          <RiCalendarEventLine className="text-xl mr-2" />
          Organizers
        </Link>
        <Link to="/signin" className="flex items-center text-md font-bold text-mediumGray hover:text-primary">
          <RiAccountCircleLine className="text-2xl mr-2" />
          Sign In
        </Link>
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
            <Link to="/signin" className="block my-4 text-md font-medium text-mediumGray hover:text-primary" role="menuitem">
              <RiAccountCircleLine className="text-xl inline-block mr-2" />
              Sign In
            </Link>
            <Link to="/sell" className="block my-4 text-md font-bold text-mediumGray hover:text-primary" role="menuitem">
              <RiCalendarEventLine className="text-xl inline-block mr-2" />
              Sell
            </Link>
            <Link to="/" className="block my-4 text-md font-bold text-mediumGray hover:text-primary" role="menuitem">
              <GoGlobe className="text-xl inline-block mr-2" />
              Language
            </Link>
            {mobileLinks.map((link, index) => (
              <div key={index} className="my-4">
                <Link to={link.to} className="block text-md font-bold text-mediumGray hover:text-primary" role="menuitem">
                  {link.icon}
                  {link.label}
                </Link>
                {link.sublinks && (
                  <div className="pl-6">
                    {link.sublinks.map((sublink, subIndex) => (
                      <Link key={subIndex} to={sublink.to} className="block text-md font-medium text-mediumGray hover:text-primary" role="menuitem">
                        {sublink.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
