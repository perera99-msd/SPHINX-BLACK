// src/components/Layout/SearchOverlay.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Loader } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from '../../utils/axios';

const SearchOverlay = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Debounce Search: Only search 500ms after user stops typing
  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (query.trim()) {
        setLoading(true);
        try {
          // Calls your existing backend: /api/products?search=query
          const { data } = await axios.get(`/products?search=${query}`);
          setResults(data.products || []);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      } else {
        setResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  // Prevent background scrolling when open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-sphynx-black/95 backdrop-blur-md flex flex-col"
      >
        {/* Header */}
        <div className="flex justify-end p-8">
          <button onClick={onClose} className="text-white hover:text-sphynx-gold transition-colors">
            <X size={32} strokeWidth={1} />
          </button>
        </div>

        {/* Search Input Area */}
        <div className="container mx-auto px-6 pt-10 pb-6 border-b border-white/10">
          <input
            autoFocus
            type="text"
            placeholder="TYPE TO SEARCH..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-4xl md:text-6xl font-display text-white placeholder:text-white/20 outline-none uppercase tracking-widest text-center"
          />
        </div>

        {/* Results Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-12">
          {loading ? (
            <div className="flex justify-center mt-20 text-sphynx-gold animate-spin">
              <Loader size={32} />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 container mx-auto">
              {results.length > 0 ? (
                results.map((product) => (
                  <Link 
                    to={`/product/${product.slug}`} 
                    key={product._id} 
                    onClick={onClose}
                    className="group"
                  >
                    <div className="relative overflow-hidden aspect-[3/4] mb-4 bg-gray-900 rounded-sm">
                      <img 
                        src={product.images?.[0]?.url} 
                        alt={product.name} 
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                      />
                    </div>
                    <h4 className="text-white text-lg font-display italic group-hover:text-sphynx-gold transition-colors">
                      {product.name}
                    </h4>
                    <span className="text-xs text-gray-500 uppercase tracking-widest">
                      ${product.price}
                    </span>
                  </Link>
                ))
              ) : query && !loading ? (
                 <div className="col-span-full text-center text-gray-500 mt-20">
                   <p className="text-sm uppercase tracking-widest">No artifacts found.</p>
                 </div>
              ) : null}
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SearchOverlay;