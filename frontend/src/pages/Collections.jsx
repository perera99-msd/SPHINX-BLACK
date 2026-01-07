import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const collections = [
  {
    id: 1,
    title: "THE VOID (SS25)",
    year: "2025",
    description: "Absence of color. Pure form. The inaugural ready-to-wear collection.",
    image: "/malehero.jpg", // Replace with your image
    link: "/shop?collection=void"
  },
  {
    id: 2,
    title: "GILDED AGE",
    year: "2024",
    description: "Where ancient gold meets modern shadow. Limited edition artifacts.",
    image: "/hero2.jpg", // Replace with your image
    link: "/shop?collection=gilded"
  },
  {
    id: 3,
    title: "NOCTURNE",
    year: "SIGNATURE",
    description: "Essentials for the night. Timeless leather and silk.",
    image: "/accc.png", // Replace with your image
    link: "/shop?collection=signature"
  }
];

const Collections = () => {
  return (
    <div className="min-h-screen bg-sphynx-black text-white pt-32 pb-20 px-6">
      
      {/* Header */}
      <div className="container mx-auto mb-20 border-b border-white/10 pb-10">
        <h1 className="text-6xl md:text-8xl font-display font-bold tracking-tighter mb-4">
          ARCHIVES
        </h1>
        <div className="flex justify-between items-end">
          <p className="text-sphynx-gold uppercase tracking-[0.3em] text-xs">
            Seasons & Exhibitions
          </p>
          <span className="text-gray-500 text-xs">[ 03 COLLECTIONS FOUND ]</span>
        </div>
      </div>

      {/* List */}
      <div className="container mx-auto space-y-24">
        {collections.map((item, index) => (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            key={item.id} 
            className="group grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            {/* Text Side (Alternates) */}
            <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-2 lg:pl-20' : 'lg:pr-20'}`}>
              <div className="flex items-center gap-4 text-sphynx-gold/50 text-sm font-mono">
                <span>0{index + 1}</span>
                <span className="h-[1px] w-12 bg-sphynx-gold/30"></span>
                <span>{item.year}</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-display italic text-white group-hover:text-sphynx-gold transition-colors duration-500">
                {item.title}
              </h2>
              
              <p className="text-gray-400 font-light leading-relaxed max-w-md">
                {item.description}
              </p>

              <Link to={item.link} className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] border-b border-white/20 pb-1 hover:border-sphynx-gold hover:text-sphynx-gold transition-all mt-6">
                Explore Drop <ArrowUpRight size={14} />
              </Link>
            </div>

            {/* Image Side */}
            <div className={`relative overflow-hidden h-[60vh] grayscale group-hover:grayscale-0 transition-all duration-1000 ease-out ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
              <div className="absolute inset-0 bg-black/20 z-10 group-hover:bg-transparent transition-all" />
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-[1.5s]"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Collections;