import React from 'react';

const HeroFounder = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
      <div className="flex flex-col-reverse md:flex-row items-stretch gap-0 relative">
        {/* LEFT: Text Section with extending pink borders */}
        <div className="w-full md:w-1/2 relative z-10 md:-translate-x-6">
          <div className="h-full border-t-4 border-b-4 border-l-4 border-pink-500 pl-8 pr-6 py-10 bg-white/95 shadow-lg rounded-tr-lg rounded-br-lg">
            <h2 className="text-4xl font-bold text-black mb-6">
              Our Legal Expertise
            </h2>

            <p className="text-lg  text-black mb-4">
              With over <strong>15 years of combined legal experience</strong>,
              our attorneys bring a deep understanding of the law and a
              commitment to justice. We have successfully handled hundreds of
              complex litigation cases and are known for our integrity,
              strategy, and client-first mindset.
            </p>

            <p className="text-lg text-black mb-4">
              Our team blends <strong>traditional legal values</strong> with
              modern tools and strategies. We don’t just respond to problems —
              we anticipate them, positioning you with the best possible
              advantage.
            </p>

            <p className="text-lg text-black mb-8">
              From criminal defense to corporate law, our expertise spans
              multiple areas, ensuring you receive comprehensive support
              tailored to your case.
            </p>

            <h3 className="text-2xl font-semibold text-black mb-4">
              Client-Centered, Results-Driven
            </h3>

            <p className="text-lg  text-black mb-4">
              At the heart of our firm is a commitment to personal service. We
              believe every client deserves to be heard, respected, and
              represented with the utmost diligence. We communicate
              transparently, build trust, and fight to protect your rights.
            </p>

            <p className="text-lg text-black">
              With offices in major cities and a reputation built on results, we
              combine the reach of a large firm with the personal attention of a
              boutique practice. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Error ipsum maiores, atque excepturi similique
              eos aspernatur rem aliquid unde at cum! Reiciendis sit sapiente
              nesciunt obcaecati repellat itaque, labore porro!
            </p>
          </div>
        </div>

        {/* RIGHT: Full Image */}
        <div className="w-full md:w-1/2">
          <div className="h-full w-full overflow-hidden rounded-lg shadow-xl">
            <img
              src={`${import.meta.env.BASE_URL}ChiefExecutiveParalegal.JPG`}
              alt="Chief Executive Paralegal"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroFounder;
