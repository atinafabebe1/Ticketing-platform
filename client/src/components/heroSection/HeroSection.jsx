import React from 'react';
import EventCard from '../event/EventCard';
import Image from '../../assets/img/niger.png';

function HeroSection() {
  return (
    <div className="flex flex-wrap justify-center items-start max-w-screen-xl mx-auto p-4 space-y-4 md:space-y-0 md:flex-row md:justify-between">
      <div className="w-full md:w-9/12 p-2">
        <EventCard imageSrc={Image} title="Event Title" description="Join us for an unforgettable night of music and entertainment!" />
      </div>
      <div className="w-full md:w-3/12 p-2">
        <div className="flex flex-col">
          <EventCard imageSrc={Image} title="Event Title" description="Experience the excitement of live performances and more!" />
          <EventCard imageSrc={Image} title="Event Title" description="Experience the excitement of live performances and more!" />
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
