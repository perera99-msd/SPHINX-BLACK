// fileName: src/pages/Shop.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Grid, List, ChevronDown, SlidersHorizontal, X } from 'lucide-react';
import axios from '../utils/axios';
import ProductCard from '../components/ProductCard';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // UI States
  const [viewMode, setViewMode] = useState('grid');
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('/products?limit=100');
        setProducts(data.products || []);
      } catch (error) {
        console.error("Error fetching collection", error);
      } finally {
        setTimeout(() => setLoading(false), 800);
      }
    };
    fetchProducts();
  }, []);

  // Filter Logic
  const filteredProducts = products
    .filter(product => {
      const matchesCategory = activeCategory === 'all' 
        ? true 
        : product.category?.name?.toLowerCase() === activeCategory.toLowerCase() || 
          product.category?.slug === activeCategory.toLowerCase();
      
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'newest': return new Date(b.createdAt) - new Date(a.createdAt);
        default: return 0;
      }
    });

  const categories = [
    { id: 'all', label: 'View All' },
    { id: 'men', label: 'Gentlemen' },
    { id: 'women', label: 'Ladies' },
    { id: 'accessories', label: 'Artifacts' }
  ];

  if (loading) return (
    <div className="min-h-screen bg-sphynx-black flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="w-px h-16 bg-sphynx-gold animate-pulse mb-4"/>
        <span className="text-sphynx-gold text-xs uppercase tracking-[0.4em]">Loading Archive</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-sphynx-black pt-32 pb-20">
      
      {/* 1. Header & Controls */}
      <div className="container mx-auto px-6 md:px-12 mb-16">
        <div className="flex flex-col md:flex-row justify-between items-end border-b border-white/5 pb-8 mb-8">
          <div>
            <span className="text-sphynx-gold text-xs uppercase tracking-[0.4em] mb-3 block">
              The Collection
            </span>
            <h1 className="text-5xl md:text-8xl font-display text-white tracking-tighter">
              ARCHIVE
            </h1>
          </div>
          <div className="hidden md:block text-right">
             <span className="text-white text-sm font-bold">{filteredProducts.length}</span>
             <span className="text-gray-500 text-sm ml-2">Artifacts Discovered</span>
          </div>
        </div>

        {/* 2. Control Bar (Sticky) */}
        <div className="sticky top-4 z-40 bg-sphynx-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl flex flex-col lg:flex-row gap-4 items-center justify-between">
          
          {/* Tabs */}
          <div className="flex space-x-1 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                  activeCategory === cat.id 
                    ? 'bg-white text-black' 
                    : 'text-gray-500 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Tools */}
          <div className="flex items-center gap-4 w-full lg:w-auto">
             <div className="relative flex-grow">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
               <input 
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 placeholder="SEARCH ARCHIVE..."
                 className="w-full bg-black/50 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white text-xs tracking-widest focus:border-sphynx-gold outline-none uppercase placeholder:text-gray-700"
               />
             </div>
             
             <div className="h-8 w-px bg-white/10 hidden md:block" />

             <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white text-xs uppercase tracking-widest outline-none focus:border-sphynx-gold"
             >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low - High</option>
                <option value="price-high">Price: High - Low</option>
             </select>
          </div>
        </div>
      </div>

      {/* 3. The Grand Grid */}
      <div className="container mx-auto px-6 md:px-12">
        {filteredProducts.length === 0 ? (
          <div className="py-32 text-center border border-dashed border-white/10 rounded-3xl">
            <h3 className="text-2xl font-display text-white mb-2">No Artifacts Found</h3>
            <button onClick={() => {setSearchQuery(''); setActiveCategory('all');}} className="text-sphynx-gold text-xs uppercase tracking-widest border-b border-sphynx-gold pb-1 mt-4">
              Clear All Filters
            </button>
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20"
          >
            <AnimatePresence>
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product._id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Shop;