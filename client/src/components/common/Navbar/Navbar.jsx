import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../Searchbar/Searchbar';
import Logo from '../../../assets/img/logo.png';
import { GoGlobe } from 'react-icons/go';
import { FaShoppingCart, FaUser } from 'react-icons/fa';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const handleBodyOverflow = () => {
      document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
    };

    handleBodyOverflow();

    return () => {
      document.body.style.overflow = 'auto'; // Reset body overflow when the component is unmounted
    };
  }, [isMenuOpen]);

  return (
    <nav className="flex items-center justify-between p-4 bg-background text-black md:px-10">
      <Link to="/">
        <div className="flex items-center space-x-4 mr-2">
          <img src={Logo} alt="Logo" className="w-28 h-22 rounded-full md:mr-8 sm:mr-2" />
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
          <FaShoppingCart className="text-xl mr-2" />
          Sell
        </Link>
        <Link to="/signin" className="flex items-center text-md font-bold text-mediumGray hover:text-primary">
          <FaUser className="text-xl mr-2" />
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
            className="absolute top-35 left-0 right-0 bg-lightGray p-4 rounded-lg shadow-md flex flex-col items-center mt-8 border border-gray-300"
            role="menu"
            aria-label="Mobile Menu"
          >
            <Link to="/signin" className="block my-4 text-md font-medium text-mediumGray hover:text-primary" role="menuitem">
              <FaUser className="text-xl inline-block mr-2" />
              Sign In
            </Link>
            <Link to="/sell" className="block my-4 text-md font-bold text-mediumGray hover:text-primary" role="menuitem">
              <FaShoppingCart className="text-xl inline-block mr-2" />
              Sell
            </Link>
            <Link to="/" className="block my-4 text-md font-bold text-mediumGray hover:text-primary" role="menuitem">
              <GoGlobe className="text-xl inline-block mr-2" />
              Language
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
