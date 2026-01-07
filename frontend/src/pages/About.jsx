import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="bg-sphynx-black text-white selection:bg-sphynx-gold selection:text-black">
      
      {/* 1. Hero Statement */}
      <section className="h-screen flex flex-col justify-center items-center text-center px-6 relative overflow-hidden">
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="text-5xl md:text-8xl font-display font-bold leading-none tracking-tighter"
        >
          SILENCE <br />
          <span className="italic font-light text-sphynx-gold">IN THE NOISE.</span>
        </motion.h1>
        <p className="mt-8 text-xs uppercase tracking-[0.4em] text-gray-500">
          The Story of Sphynx
        </p>
      </section>

      {/* 2. The Philosophy */}
      <section className="py-24 px-6 md:px-20 border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 max-w-6xl mx-auto">
          <div>
             <h2 className="text-3xl font-display mb-6">The Philosophy</h2>
             <div className="h-1 w-20 bg-sphynx-gold mb-8"></div>
          </div>
          <div className="space-y-6 text-gray-400 font-light leading-relaxed text-lg">
            <p>
              Sphynx was born from a rejection of excess. In a world shouting for attention, we chose to whisper.
            </p>
            <p>
              We believe luxury is not about adding more, but stripping away the unnecessary until only the essential remains. Our designs sit at the intersection of <span className="text-white">ancient geometry</span> and <span className="text-white">futurist silhouettes</span>.
            </p>
          </div>
        </div>
      </section>

      {/* 3. The Atelier (Craftsmanship) */}
      <section className="py-24 bg-[#080808]">
        <div className="container mx-auto px-6">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {[
                { title: "Materiality", desc: "Sourced from the finest tanneries and mills in Italy and Japan." },
                { title: "The Craft", desc: "Hand-finished details that honor the tradition of bespoke tailoring." },
                { title: "Longevity", desc: "We do not follow seasons. We create artifacts meant to outlast time." }
              ].map((item, i) => (
                <div key={i} className="p-8 border border-white/5 hover:border-sphynx-gold/30 transition-colors duration-500">
                   <h3 className="text-xl font-display text-white mb-4">{item.title}</h3>
                   <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* 4. Location */}
      <section className="h-[50vh] flex items-center justify-center bg-fixed bg-cover bg-center grayscale relative" style={{ backgroundImage: "url('/studio.jpg')" }}>
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative z-10 text-center">
          <p className="text-xs uppercase tracking-[0.5em] mb-4 text-sphynx-gold">Established 2024</p>
          <h2 className="text-4xl font-display">COLOMBO, SRI LANKA</h2>
        </div>
      </section>

    </div>
  );
};

export default About;