import React, { useState, useEffect } from 'react';

const HeroSlides = () => {
  const images = [
    '/RotaryImage1.jpg',
    '/RotaryImage2.jpg',
    '/RotaryImage3.jpg',
    '/RotaryImage4.jpg',
    '/RotaryImage5.png',
    '/RotaryImage6.jpg',
    '/RotaryImage7.jpg',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
        setFade(true);
      }, 500); // Matches the transition duration
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Images with Fade Transition */}
      <div className="relative w-full h-full">
        {images.map((img, index) => (
          <div
            key={img}
            className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${index === currentIndex && fade ? 'opacity-100' : 'opacity-0'}`}
          >
            <img
              src={img}
              alt={`Rotary ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Text Overlays */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <div className="bg-white bg-opacity-90 px-6 py-4 rounded-lg mb-4 max-w-md">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Rotary Club Events
          </h1>
        </div>
        <div className="bg-pink-600 bg-opacity-90 px-6 py-4 rounded-lg max-w-md">
          <p className="text-xl md:text-2xl font-medium text-white">
            Serving the Community Since 1905
          </p>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setFade(false);
              setTimeout(() => {
                setCurrentIndex(index);
                setFade(true);
              }, 500);
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-pink-600 w-6' : 'bg-white bg-opacity-50'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlides;
