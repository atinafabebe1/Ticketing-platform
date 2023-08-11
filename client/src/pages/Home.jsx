import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import jwt_decode from 'jwt-decode';
import HeroSection from '../components/heroSection/HeroSection';
import EventList from '../components/event/EventList';

function Home() {
  const userToken = useSelector((state) => state.auth.user);
  const [userRole, setUserRole] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const decodedToken = jwt_decode(userToken);
      setUserRole(decodedToken.role);
    } catch (error) {
      setUserRole(null);
    }
  }, [userToken]);

  if (userRole === 'organizer') {
    return <div className="p-4 px-8">organizer dashboard</div>;
  }

  return (
    <div>
      <div>
        <HeroSection />
        <EventList category="Concert" />
        <EventList category="Concert" />
      </div>
    </div>
  );
}

export default Home;
