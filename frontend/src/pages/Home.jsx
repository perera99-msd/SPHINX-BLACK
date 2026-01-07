// fileName: src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import axios from '../utils/axios';

// Components
import Hero from '../components/Home/Hero';
import NewArrivals from '../components/Home/NewArrivals';
import Categories from '../components/Home/Categories';
import FeaturedProducts from '../components/Home/FeaturedProducts';
import Testimonials from '../components/Home/Testimonials';
import Newsletter from '../components/Home/Newsletter';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  // Parallax Scroll Hooks
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  // Fetch Real Backend Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          axios.get('/products?limit=20'),
          axios.get('/categories')
        ]);
        setProducts(prodRes.data.products || []);
        setCategories(catRes.data || []);
      } catch (error) {
        console.error("API Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return (
    <div className="h-screen w-full bg-sphynx-black flex items-center justify-center text-sphynx-gold uppercase tracking-[0.3em] animate-pulse">
      Loading Maison...
    </div>
  );

  return (
    <div className="bg-sphynx-black text-white relative overflow-x-hidden selection:bg-sphynx-gold selection:text-black">
      
      {/* Global Film Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay"
           style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")` }}>
      </div>

      <Hero />

      {/* 2. PHILOSOPHY (Moved After Hero) */}
      <section className="relative py-32 md:py-48 px-6 border-b border-white/5 overflow-hidden bg-sphynx-black z-20">
        <motion.div style={{ y: yParallax }} className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-[0.03] pointer-events-none">
          <h1 className="text-[20vw] font-display whitespace-nowrap">ANCIENT FUTURE</h1>
        </motion.div>
        
        <div className="container mx-auto text-center relative z-10 max-w-4xl">
          <div className="flex flex-col items-center">
            <div className="h-16 w-[1px] bg-sphynx-gold mb-8"></div>
            <span className="text-sphynx-gold text-xs uppercase tracking-[0.4em] mb-6 block">The Philosophy</span>
            <h2 className="text-3xl md:text-5xl font-display leading-tight mb-8">
              "We exist in the space between <span className="italic text-gray-500">shadow</span> and form. <br />
              Luxury is not excess, it is <span className="text-sphynx-gold">restraint</span>."
            </h2>
          </div>
        </div>
      </section>

      {/* 3. FEATURED ITEMS (After Philosophy) */}
      <section className="relative z-10 py-24 border-b border-white/5">
        <FeaturedProducts products={products.filter(p => p.featured)} />
      </section>

      {/* 4. THE DEPARTMENTS (Categories) */}
      <section className="relative z-10 py-24 md:py-32">
        <Categories categories={categories} />
      </section>

      {/* 5. NEW ARRIVALS (Smaller & Animated) */}
      <NewArrivals products={products.filter(p => p.newArrival)} />

      {/* 6. SOCIAL PROOF */}
      <Testimonials />
      <Newsletter />
    </div>
  );
};

export default Home;