// src/components/Home/Categories.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getImageUrl } from '../../utils/imageHelper'; // <--- IMPORT HELPER

const Categories = ({ categories }) => {
  // Fallback Data
  const defaultImages = [
    '/menc.png',      // Men
    '/womenc.png',    // Women
    '/accc.png'       // Accessories
  ];

  const displayCats = categories && categories.length > 0 ? categories : [
    { _id: '1', name: 'Gentlemen', slug: 'men', description: 'Ready-to-Wear' },
    { _id: '2', name: 'Ladies', slug: 'women', description: 'Evening Collection' },
    { _id: '3', name: 'Artifacts', slug: 'accessories', description: 'Leather & Gold' },
  ];

  return (
    <section className="relative w-full h-screen bg-sphynx-black flex flex-col md:flex-row overflow-hidden">
      
      {displayCats.slice(0, 3).map((category, index) => (
        <Link 
          key={category._id}
          to={`/shop?category=${category.slug}`}
          className="group relative w-full h-[33.33vh] md:h-full md:w-1/3 border-b md:border-b-0 md:border-r border-white/5 block overflow-hidden"
        >
          {/* Wall Background */}
          <div className="absolute inset-0 bg-[#050505] opacity-100" />

          {/* Frame Container */}
          <div className="absolute inset-0 p-4 md:p-8 flex items-center justify-center">
            
            {/* Physical Frame */}
            <div className="relative w-full h-full border border-sphynx-gold/20 bg-sphynx-rich/40 flex items-center justify-center overflow-hidden transition-all duration-700 group-hover:border-sphynx-gold/50 group-hover:bg-sphynx-rich/60">
              
              {/* --- UPDATED IMAGE SOURCE --- */}
              <img 
                src={getImageUrl(category.image) || defaultImages[index]} 
                alt={category.name} 
                className="w-full h-full object-contain opacity-80 transition-transform duration-[1.5s] ease-out group-hover:scale-105 group-hover:opacity-100"
              />
              
              {/* Inner Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-60 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none" />
            </div>
          </div>

          {/* Text Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 pointer-events-none">
            
            <span className="text-sphynx-gold text-[9px] uppercase tracking-[0.3em] opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-out mb-2 bg-black/50 px-2 py-1 rounded">
              0{index + 1} — {category.description}
            </span>

            <h3 className="text-3xl md:text-5xl lg:text-6xl font-display text-white italic tracking-tight mb-2 drop-shadow-2xl group-hover:scale-105 transition-transform duration-700">
              {category.name}
            </h3>

            <div className="overflow-hidden mt-2">
              <div className="flex items-center gap-2 text-white/80 text-[10px] md:text-xs uppercase tracking-widest translate-y-10 group-hover:translate-y-0 transition-transform duration-500 delay-100 bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">
                <span>View Collection</span>
                <ArrowRight size={12} className="text-sphynx-gold" />
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-sphynx-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-in-out origin-center z-20" />
        </Link>
      ))}

      <div className="absolute bottom-6 left-0 w-full text-center pointer-events-none z-20 mix-blend-difference">
        <p className="text-[10px] text-white/50 uppercase tracking-[0.5em]">
          Sphynx Black © 2025
        </p>
      </div>

    </section>
  );
};

export default Categories;