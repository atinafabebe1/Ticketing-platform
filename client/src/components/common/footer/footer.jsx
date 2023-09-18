import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

function Footer() {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) {
      const map = L.map('map').setView([9.145, 39.4638], 6); // Centered on Ethiopia, adjust the zoom level as needed
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      L.marker([9.145, 39.4638]).addTo(map).bindPopup('Ethiopia').openPopup();

      mapRef.current = map;
    }
  }, []);

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Column 1 */}
        <div className="md:col-span-1">
          <h3 className="text-2xl font-semibold mb-4">About Us</h3>
          <p className="text-gray-400">
            We are committed to creating unforgettable event experiences. Our mission is to connect people with memorable moments, making every event
            accessible. Our platform's vision is to provide seamless ticketing for organizers and attendees alike. Join us in crafting lasting
            memories.
          </p>
        </div>

        {/* Column 2 */}
        <div className="md:col-span-1">
          <h3 className="text-2xl font-semibold mb-4">Contact Us</h3>
          <p className="text-gray-400">Email: admin@YeneTicet.com</p>
          <p className="text-gray-400">Phone: +251-942-326-141</p>
        </div>

        {/* Column 3 */}
        <div className="md:col-span-1">
          <h3 className="text-2xl font-semibold mb-4">Links</h3>
          <ul>
            <li>
              <Link to="/" className="text-gray-400 hover:text-white transition duration-300">
                Home
              </Link>
            </li>
            <li>
              <Link to="/events" className="text-gray-400 hover:text-white transition duration-300">
                Events
              </Link>
            </li>
            <li>
              <Link to="/tickets" className="text-gray-400 hover:text-white transition duration-300">
                Tickets
              </Link>
            </li>
            <li>
              <Link to="/faq" className="text-gray-400 hover:text-white transition duration-300">
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="text-gray-400 hover:text-white transition duration-300">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4 (Map) */}
        <div className="md:col-span-1">
          <h3 className="text-2xl font-semibold mb-4">Location</h3>
          <div id="map" className="h-60 rounded-lg"></div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
