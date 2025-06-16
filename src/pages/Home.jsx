import HeroMission from '../components/hero/HeroMission';
import React from 'react';
import HeroSlides from '../components/hero/HeroSlides';
import HeroFounder from '../components/hero/HeroFounder';
import HeroContact from '../components/hero/HeroContact';

const Home = () => {
  return (
    <div>
      <HeroSlides />
      <HeroMission />
      <HeroFounder />
      <HeroContact />
    </div>
  );
};

export default Home;
