import React from 'react';

const HeroContact = () => {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div
        className="max-w-3xl mx-auto bg-white/90 border border-gray-200 
      shadow-2xl rounded-lg p-10 text-center backdrop-blur-sm"
      >
        <p className="text-lg font-bold md:text-xl mb-6 leading-relaxed text-gray-800">
          Call Corley Integrated Paralegal Services{' '}
          <span className="font-bold text-pink-600">(212) 347-5020</span> or
          contact us online to learn more about how we can help you.
        </p>
        <button className="bg-pink-600 hover:bg-pink-700 text-white font-medium py-3 px-8 rounded-md shadow-md transition-transform duration-300 hover:scale-105">
          Schedule a free consultation
        </button>
      </div>
    </div>
  );
};

export default HeroContact;
