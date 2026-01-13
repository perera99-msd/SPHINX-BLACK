// fileName: src/components/Layout/Footer.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    
    // Luxury styled toast
    toast.success("Welcome to the list.", {
      style: {
        background: '#111',
        color: '#fff',
        border: '1px solid #333',
        borderRadius: '0px',
        fontFamily: 'sans-serif',
        letterSpacing: '1px',
        fontSize: '12px',
        textTransform: 'uppercase'
      },
      iconTheme: {
        primary: '#C5A059',
        secondary: '#000',
      },
    });
    
    setEmail('');
  };

  return (
    <footer className="bg-sphynx-black text-white pt-32 pb-6 border-t border-white/5 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-24">
          <div className="space-y-8">
            <h4 className="text-xs uppercase tracking-[0.2em] text-sphynx-gold">Contact</h4>
            <p className="text-gray-400 font-light leading-relaxed text-sm">
              Level 35, West Tower<br />
              Colombo 01, Sri Lanka<br />
              concierge@sphynx.blk
            </p>
          </div>

          <div className="space-y-6">
             <h4 className="text-xs uppercase tracking-[0.2em] text-sphynx-gold">Shop</h4>
             <ul className="space-y-3 text-sm font-light text-gray-400">
                <li><Link to="/shop?category=men" className="hover:text-white transition-colors">Gentlemen</Link></li>
                <li><Link to="/shop?category=women" className="hover:text-white transition-colors">Ladies</Link></li>
                <li><Link to="/shop?category=accessories" className="hover:text-white transition-colors">Artifacts</Link></li>
             </ul>
          </div>

          <div className="space-y-6">
             <h4 className="text-xs uppercase tracking-[0.2em] text-sphynx-gold">Client Services</h4>
             <ul className="space-y-3 text-sm font-light text-gray-400">
                <li><Link to="/shipping" className="hover:text-white transition-colors">Shipping & Returns</Link></li>
                <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
                <li><Link to="/terms" className="hover:text-white transition-colors">Legal</Link></li>
             </ul>
          </div>

          <div className="space-y-6">
             <h4 className="text-xs uppercase tracking-[0.2em] text-sphynx-gold">Newsletter</h4>
             {/* Changed div to form to handle "Enter" keypress */}
             <form onSubmit={handleSubscribe} className="flex border-b border-white/20 pb-2">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="EMAIL ADDRESS" 
                  className="w-full bg-transparent outline-none text-sm placeholder:text-gray-700 tracking-widest uppercase" 
                />
                <button type="submit" className="text-xs uppercase hover:text-sphynx-gold transition-colors">Subscribe</button>
             </form>
          </div>
        </div>

        {/* Massive Brand Text */}
        <div className="border-t border-white/5 pt-10">
           <h1 className="text-[18vw] leading-[0.8] font-display font-bold text-center text-[#0a0a0a] select-none tracking-tighter mix-blend-difference pointer-events-none">
             SPHYNX
           </h1>
           <div className="flex justify-between items-center mt-6 text-[10px] uppercase tracking-widest text-gray-600">
             <span>© {currentYear} Sphynx Black Ltd.</span>
             <span>Designed for Luxury</span>
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;