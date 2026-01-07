// src/components/Layout/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingBag, User, Menu, X, Search } from 'lucide-react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import SearchOverlay from './SearchOverlay'; // <--- IMPORT THE NEW COMPONENT

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false); // <--- NEW STATE
  
  const { user } = useSelector((state) => state.auth);
  const { totalQuantity } = useSelector((state) => state.cart);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4">
        <nav 
          className={`transition-all duration-500 ease-out flex items-center justify-between px-8 py-4 rounded-full border border-white/10 ${
            isScrolled 
              ? 'w-full max-w-6xl bg-black/80 backdrop-blur-xl shadow-2xl' 
              : 'w-full bg-transparent border-transparent'
          }`}
        >
          {/* Logo */}
          <Link to="/" className="text-2xl font-display font-bold text-white tracking-[0.2em] relative z-50">
            SPHYNX<span className="text-sphynx-gold">.</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
            {['Shop', 'Collections', 'About'].map((item) => (
              <NavLink 
                key={item} 
                to={`/${item.toLowerCase()}`}
                className={({isActive}) => 
                  `text-[10px] uppercase tracking-[0.25em] font-bold transition-colors ${isActive ? 'text-sphynx-gold' : 'text-gray-400 hover:text-white'}`
                }
              >
                {item}
              </NavLink>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center gap-6 z-50 text-white">
             
             {/* SEARCH BUTTON (Fixed) */}
             <button 
               onClick={() => setIsSearchOpen(true)} 
               className="hover:text-sphynx-gold transition-colors"
             >
               <Search size={18} strokeWidth={1.5} />
             </button>

             <Link to={user ? "/profile" : "/login"} className="hover:text-sphynx-gold transition-colors">
                <User size={18} strokeWidth={1.5} />
             </Link>
             
             <Link to="/cart" className="relative hover:text-sphynx-gold transition-colors">
               <ShoppingBag size={18} strokeWidth={1.5} />
               {totalQuantity > 0 && (
                 <span className="absolute -top-1 -right-1 w-3 h-3 bg-sphynx-gold rounded-full flex items-center justify-center text-[8px] text-black font-bold">
                   {totalQuantity}
                 </span>
               )}
             </Link>
             
             <button onClick={() => setIsMenuOpen(true)} className="md:hidden">
               <Menu size={20} />
             </button>
          </div>
        </nav>
      </div>

      {/* --- INJECT THE SEARCH OVERLAY HERE --- */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-sphynx-black flex flex-col justify-center items-center"
          >
            <button onClick={() => setIsMenuOpen(false)} className="absolute top-8 right-8 text-white hover:text-sphynx-gold">
               <X size={32} strokeWidth={1} />
            </button>
            <div className="flex flex-col gap-8 text-center">
              {['Home', 'Shop', 'Collections', 'About', 'Profile'].map(link => (
                <Link 
                  key={link} 
                  to={link === 'Home' ? '/' : `/${link.toLowerCase()}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-5xl font-display text-white hover:text-sphynx-gold hover:italic transition-all"
                >
                  {link}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;