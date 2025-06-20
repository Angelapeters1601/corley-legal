import React, { useState, useEffect } from 'react';

const HeroSlides = () => {
  const images = [
    `${import.meta.env.BASE_URL}RotaryImage1.jpg`,
    `${import.meta.env.BASE_URL}RotaryImage2.jpg`,
    `${import.meta.env.BASE_URL}RotaryImage3.jpg`,
    `${import.meta.env.BASE_URL}RotaryImage4.jpg`,
    `${import.meta.env.BASE_URL}RotaryImage5.png`,
    `${import.meta.env.BASE_URL}RotaryImage6.jpg`,
    `${import.meta.env.BASE_URL}RotaryImage7.jpg`,
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
        setIsTransitioning(false);
      }, 1000); // Matches the transition duration
    }, 6000); // Change image every 6 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  // Preload images
  useEffect(() => {
    images.forEach((img) => {
      new Image().src = img;
    });
  }, [images]);

  return (
    <div className="relative w-full h-[75vh] overflow-hidden">
      {/* Background Images with Smooth Transition */}
      <div className="relative w-full h-full">
        {images.map((img, index) => (
          <div
            key={img}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === currentIndex
                ? 'opacity-100'
                : 'opacity-0 pointer-events-none'
            } ${isTransitioning && index === currentIndex ? 'opacity-0' : ''}`}
          >
            <img
              src={img}
              alt={`Rotary ${index + 1}`}
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
        ))}
      </div>

      {/* Text Overlays - Positioned closer to bottom */}
      <div className="absolute inset-x-0 bottom-20 flex flex-col items-center justify-end text-center px-4">
        <div
          className="bg-white/70 px-8 py-6 mb-4 w-full max-w-4xl
          transform transition-transform duration-700 hover:scale-105
          whitespace-nowrap overflow-hidden"
        >
          <h1
            className="text-3xl md:text-4xl font-bold lg:text-4xl text-black tracking-wider
            overflow-visible truncate md:whitespace-normal"
          >
            Relentlessly Defending Our Clients
          </h1>
        </div>

        <div className="bg-pink-600 bg-opacity-90 px-8 py-5 max-w-max transform transition-transform duration-700 hover:scale-105 whitespace-nowrap">
          <p className="text-xl md:text-2xl lg:text-3xl font-bold text-white tracking-wider">
            Schedule a Consultation
            <span className="font-black">(212) 347-5020</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSlides;
