// fileName: src/components/Home/FeaturedProducts.jsx
import React, { useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';
import ProductCard from '../ProductCard'; 
import 'swiper/css';

const FeaturedProducts = ({ products }) => {
  // 1. FILTER: Strict check to ensure only 'featured' items are displayed
  const featuredCollection = useMemo(() => {
    if (!products) return [];
    return products.filter(product => product.featured === true);
  }, [products]);

  // If no featured products exist, hide the section
  if (featuredCollection.length === 0) return null;

  // 2. LOOP LOGIC: Ensure smooth infinite scroll
  // If we have fewer than 10 items, duplicate them to create a seamless buffer
  const loopProducts = useMemo(() => {
    if (featuredCollection.length < 10) {
       // Triple the array so Swiper has enough slides to loop seamlessly
       return [...featuredCollection, ...featuredCollection, ...featuredCollection]; 
    }
    return featuredCollection;
  }, [featuredCollection]);

  return (
    <section className="bg-sphynx-black relative z-20 py-32 overflow-hidden border-t border-white/5">
      
      {/* Header (Contained) */}
      <div className="container mx-auto px-6 md:px-12 mb-20 text-center">
         <div className="flex items-center justify-center gap-4 mb-6">
             <div className="w-12 h-[1px] bg-sphynx-gold opacity-60"></div>
             <span className="text-sphynx-gold text-[10px] uppercase tracking-[0.4em] font-medium">
               Maison Selects
             </span>
             <div className="w-12 h-[1px] bg-sphynx-gold opacity-60"></div>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-display text-white tracking-tight mb-6">
            Essential <span className="italic text-gray-600 font-light">&</span> Rare
          </h2>
          
          <Link 
             to="/shop" 
             className="inline-block text-[10px] uppercase tracking-[0.25em] text-gray-500 hover:text-white border-b border-transparent hover:border-white transition-all pb-1"
          >
             View The Archive
          </Link>
      </div>

      {/* Slider (Full Screen / Edge-to-Edge) */}
      <div className="w-full select-none cursor-ew-resize"> 
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20} 
          slidesPerView={1.5} // Mobile
          centeredSlides={true}
          loop={true}
          speed={8000} // Cinematic slow loop
          allowTouchMove={true}
          autoplay={{
            delay: 0, 
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }}
          breakpoints={{
            640: { slidesPerView: 2.0, spaceBetween: 20 },
            1024: { slidesPerView: 3.0, spaceBetween: 30 }, // Desktop: exactly 3 items
            1600: { slidesPerView: 3.8, spaceBetween: 40 }, // Wide
          }}
          className="!ease-linear" 
          wrapperClass="!ease-linear"
        >
          {loopProducts.map((product, index) => (
            // Using index in key because duplicates will have same ID
            <SwiperSlide key={`${product._id}-${index}`} className="h-auto">
              <div className="h-full px-2 transform transition-all duration-700 hover:scale-[1.01] hover:opacity-100 opacity-90">
                <ProductCard product={product} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default FeaturedProducts;