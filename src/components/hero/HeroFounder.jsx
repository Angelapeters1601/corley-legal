import React from 'react';
import { motion } from 'framer-motion';

const HeroFounder = () => {
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const textItem = {
    hidden: { x: -40, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const imageSlide = {
    hidden: { x: 40, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.2, 0.8, 0.4, 1],
      },
    },
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col-reverse md:flex-row items-stretch gap-0 relative">
        {/* LEFT: Text Section */}
        <motion.div
          className="w-full md:w-1/2 relative z-10 md:-translate-x-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={container}
        >
          <div className="h-full border-t-4 border-b-4 border-l-4 border-pink-500 pl-8 pr-6 py-10 bg-white/95 shadow-lg rounded-tr-lg rounded-br-lg">
            <motion.h2
              className="text-4xl font-bold text-black mb-6"
              variants={textItem}
            >
              Our Legal Expertise
            </motion.h2>

            <motion.p className="text-lg text-black mb-4" variants={textItem}>
              With over <strong>15 years of combined legal experience</strong>,
              our attorneys bring a deep understanding of the law and a
              commitment to justice.
            </motion.p>

            <motion.p className="text-lg text-black mb-4" variants={textItem}>
              Our team blends <strong>traditional legal values</strong> with
              modern tools and strategies.
            </motion.p>

            <motion.p className="text-lg text-black mb-8" variants={textItem}>
              From criminal defense to corporate law, our expertise spans
              multiple areas.
            </motion.p>

            <motion.h3
              className="text-2xl font-semibold text-black mb-4"
              variants={textItem}
            >
              Client-Centered, Results-Driven
            </motion.h3>

            <motion.p className="text-lg text-black mb-4" variants={textItem}>
              At the heart of our firm is a commitment to personal service.
            </motion.p>

            <motion.p className="text-lg text-black" variants={textItem}>
              With offices in major cities and a reputation built on results.
            </motion.p>
            <motion.p className="text-lg text-black" variants={textItem}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut
              pariatur reiciendis officiis repellendus necessitatibus ea
              suscipit, sit rem, quisquam vitae, error repellat dolore ducimus
              assumenda magni veniam fugit adipisci? Asperiores nostrum
              blanditiis commodi at sint laborum earum voluptates autem
              doloribus, voluptatibus, quis vel aperiam optio laudantium
              reiciendis fuga architecto vero?
            </motion.p>
            <motion.p className="text-lg text-black" variants={textItem}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Voluptates vitae at consequatur rem, facilis distinctio pariatur
              vero beatae, voluptatum minus nemo, deleniti repellendus fuga
              eveniet nihil. Quae veritatis quibusdam modi! Itaque at quasi,
              officiis doloribus saepe animi vel. Ratione exercitationem
              tempora, ea esse dolores ipsam libero repellendus repudiandae a
              qui?
            </motion.p>
          </div>
        </motion.div>

        {/* RIGHT: Image Section */}
        <motion.div
          className="w-full md:w-1/2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={imageSlide}
        >
          <div className="h-full w-full overflow-hidden rounded-lg shadow-xl md:shadow-2xl">
            <img
              src={`${import.meta.env.BASE_URL}ChiefExecutiveParalegal.JPG`}
              alt="Chief Executive Paralegal"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroFounder;
