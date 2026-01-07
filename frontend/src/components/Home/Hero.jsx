// fileName: src/components/Home/Hero.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCreative } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/effect-creative';

const slides = [
  { id: 1, image: "/hero2.jpg", title: "SILENCE", sub: "Autumn / Winter 2026", link: "/shop?category=men" },
  { id: 2, image: "/malehero.jpg", title: "ETERNAL", sub: "The Gold Standard", link: "/shop?category=women" }
];

const Hero = () => {
  return (
    <section className="h-screen w-full relative bg-black overflow-hidden">
      <Swiper
        modules={[Autoplay, EffectCreative]}
        effect={'creative'}
        creativeEffect={{
          prev: { translate: [0, 0, -400], opacity: 0 },
          next: { translate: ['100%', 0, 0], opacity: 1 },
        }}
        speed={1500}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        className="h-full w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="relative h-full w-full">
            {/* Background */}
            <div className="absolute inset-0">
              <img 
                src={slide.image} 
                alt="Hero" 
                className="w-full h-full object-cover opacity-60" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-4">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="flex items-center gap-4 mb-6"
              >
                <div className="w-8 h-[1px] bg-sphynx-gold" />
                <span className="text-sphynx-gold text-xs uppercase tracking-[0.4em]">{slide.sub}</span>
                <div className="w-8 h-[1px] bg-sphynx-gold" />
              </motion.div>

              <h1 className="text-[15vw] md:text-[12rem] font-display text-white leading-none tracking-tighter mix-blend-overlay opacity-90">
                {slide.title}
              </h1>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="mt-12"
              >
                <Link 
                  to={slide.link}
                  className="group relative px-8 py-3 overflow-hidden rounded-full bg-transparent border border-white/20 inline-block"
                >
                  <span className="absolute inset-0 w-full h-full bg-white/10 group-hover:bg-sphynx-gold transition-all duration-300 ease-out transform -translate-x-full group-hover:translate-x-0"></span>
                  <span className="relative text-xs font-bold uppercase tracking-[0.2em] group-hover:text-black transition-colors">
                    Explore Collection
                  </span>
                </Link>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Footer of Hero */}
      <div className="absolute bottom-10 w-full px-10 flex justify-between items-end z-30 mix-blend-difference text-white">
        <div className="hidden md:block text-[10px] uppercase tracking-widest leading-loose">
          Based in Sri Lanka<br/>
          Est. MMXV
        </div>
        <div className="animate-bounce text-[10px] uppercase tracking-widest">
          Scroll Down
        </div>
      </div>
    </section>
  );
};

export default Hero;