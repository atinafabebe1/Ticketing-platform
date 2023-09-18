import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import jwt_decode from 'jwt-decode';
import HeroSection from '../components/heroSection/HeroSection';
import EventList from '../components/event/EventList';
import OrganizerDashboard from '../components/event/OrganizerDashboard';

function Home() {
  const userToken = useSelector((state) => state.auth.user);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    try {
      const decodedToken = jwt_decode(userToken);
      setUserRole(decodedToken.role);
    } catch (error) {
      setUserRole(null);
    }
  }, [userToken]);

  const renderDashboard = () => {
    if (userRole === 'organizer') {
      return (
        <div className="p-4 px-8">
          <OrganizerDashboard />
        </div>
      );
    }
    return (
      <div>
        <div className="mx-6">
          <HeroSection />
        </div>
        <div className="my-8 mx-6">
          <EventList category="Concert" />
        </div>
        <div className="my-8 mx-6">
          <EventList category="Sports" />
        </div>
      </div>
    );
  };

  return <div>{renderDashboard()}</div>;
}

export default Home;
