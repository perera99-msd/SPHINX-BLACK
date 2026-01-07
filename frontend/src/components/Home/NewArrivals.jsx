// fileName: src/components/Home/NewArrivals.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';
import ProductCard from '../ProductCard'; 
import 'swiper/css';

const NewArrivals = ({ products }) => {
  if (!products || products.length === 0) return null;

  return (
    <section className="py-24 bg-[#050505] relative border-t border-white/5 overflow-hidden">
      
      {/* 1. Header - Classic Editorial Style */}
      <div className="container mx-auto px-6 md:px-12 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-l-2 border-sphynx-gold pl-6 md:pl-8">
           
           {/* Left: Typography */}
           <div className="max-w-xl">
              <span className="text-sphynx-gold text-[10px] uppercase tracking-[0.4em] mb-3 block font-medium">
                Fresh from the Atelier
              </span>
              <h2 className="text-4xl md:text-5xl font-display text-white leading-none tracking-tight">
                New <span className="italic text-gray-600 font-light">Acquisitions</span>
              </h2>
           </div>
           
           {/* Right: Link */}
           <div className="flex items-center pb-1">
              <Link 
                to="/shop?sort=newest" 
                className="group flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-gray-500 hover:text-white transition-colors"
              >
                View Full Collection 
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
           </div>
        </div>
      </div>

      {/* 2. The Slider - Continuous Infinite Ribbon */}
      <div className="w-full cursor-ew-resize">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20} 
          slidesPerView={2.2} // Mobile
          loop={true}
          speed={6000} // Constant smooth flow
          allowTouchMove={true}
          centeredSlides={false} 
          autoplay={{
            delay: 0, 
            disableOnInteraction: false,
            pauseOnMouseEnter: true 
          }}
          breakpoints={{
            640: { slidesPerView: 3.2, spaceBetween: 24 },
            1024: { slidesPerView: 4.5, spaceBetween: 30 }, // Desktop: Clean layout
            1440: { slidesPerView: 5.5, spaceBetween: 30 }, // Wide: High density
          }}
          className="!ease-linear !pl-4 md:!pl-12" // Left padding for alignment
          wrapperClass="!ease-linear"
        >
          {products.map((product) => (
            <SwiperSlide key={product._id} className="h-auto">
               <div className="h-full transform transition-all duration-500 hover:opacity-100 opacity-80">
                  <ProductCard product={product} />
               </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default NewArrivals;