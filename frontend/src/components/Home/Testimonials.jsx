import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Alexandra Chen',
      role: 'Fashion Editor, Vogue',
      content: 'SPHYNX BLACK has redefined minimalist luxury. Each piece feels like a sculpture, crafted with incredible attention to detail.',
    },
    {
      id: 2,
      name: 'Marcus Thorne',
      role: 'Creative Director',
      content: 'The quality of materials is unparalleled. These are investment pieces that anchor a modern wardrobe.',
    },
  ];

  return (
    <section className="py-32 bg-sphynx-rich text-center overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-sphynx-gold/30 to-transparent"></div>
      
      <div className="container mx-auto px-4">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          className="max-w-4xl mx-auto"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="flex flex-col items-center py-10">
                {/* Large decorative quote mark */}
                <div className="text-sphynx-gold/20 font-display text-9xl leading-none mb-6">"</div>
                
                <p className="text-2xl md:text-4xl font-display text-sphynx-light leading-tight mb-12 italic">
                  {testimonial.content}
                </p>
                
                <div className="space-y-2">
                  <div className="text-sphynx-gold tracking-widest uppercase text-sm font-medium">
                    {testimonial.name}
                  </div>
                  <div className="text-gray-500 text-xs tracking-wider">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;