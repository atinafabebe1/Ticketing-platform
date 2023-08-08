import React from 'react';
import HeroSection from '../components/heroSection/HeroSection';
import EventList from '../components/event/EventList';

function Home() {
  return (
    <div>
      <HeroSection />

      <EventList category="Concert" />
      <EventList category="Concert" />
    </div>
  );
}

export default Home;
