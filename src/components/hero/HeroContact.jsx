import React from 'react';

const HeroContact = () => {
  return (
    <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
          Call Corley Legal today at{' '}
          <span className="font-semibold text-gray-900">(210) 444-2889</span> or
          contact us online to learn more about how we can help you.
        </p>
        <button className="bg-pink-600 hover:bg-pink-700 text-white font-medium py-3 px-8 rounded-md shadow-md transition-colors duration-300 transform hover:scale-105">
          Schedule a free consultation
        </button>
      </div>
    </div>
  );
};

export default HeroContact;
