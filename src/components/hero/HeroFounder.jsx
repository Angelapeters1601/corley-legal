import React from 'react';

const HeroFounder = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex flex-col md:flex-row gap-12 items-center">
        {/* Text Content */}
        <div className="md:w-2/3 space-y-6">
          <h2 className="text-3xl font-bold text-gray-900 border-b-2 border-pink-600 pb-2">
            About Our Founder
          </h2>
          <div className="space-y-4 text-gray-700">
            <p className="text-lg leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci,
              fugit cupiditate, nesciunt fugiat voluptate, repellat non quas
              necessitatibus aliquam quibusdam hic deserunt quam omnis eum esse
              exercitationem nobis? Voluptatum, deserunt?
            </p>
            <p className="text-lg leading-relaxed">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos
              neque temporibus ut ipsa exercitationem in enim asperiores
              recusandae veniam. Architecto mollitia, laborum molestiae aperiam
              quo sed nihil. Dicta, porro atque!
            </p>
            <p className="text-lg leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
              obcaecati modi, tempora repellat accusantium quam animi magni,
              impedit, tempore necessitatibus enim aliquam porro magnam
              laboriosam? Neque quisquam quasi maxime id?
            </p>
          </div>
        </div>

        {/* Image */}
        <div className="relative w-full md:w-96 h-250 rounded-lg overflow-hidden shadow-xl bg-gray-100">
          <img
            src={`${import.meta.env.BASE_URL}ChiefExecutiveParalegal.JPG`}
            a
            lt="Chief Executive Paralegal"
            alt="Founder"
            className="w-full h-full object-cover object-top" // Focus on keeping the head in frame
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroFounder;
