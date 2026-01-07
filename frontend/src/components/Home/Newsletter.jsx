import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Newsletter = () => {
  const [email, setEmail] = useState('');

  return (
    <section className="py-32 bg-sphynx-black border-t border-white/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="max-w-xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-5xl font-display text-white mb-6">
            The Inner Circle
          </h2>
          
          <p className="text-gray-400 mb-10 font-light leading-relaxed">
            Join our exclusive list for early access to limited edition drops, private sales, and curations.
          </p>

          <form className="flex flex-col md:flex-row gap-0">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ENTER YOUR EMAIL"
              className="flex-grow bg-transparent border-b border-white/30 px-4 py-4 text-white focus:outline-none focus:border-sphynx-gold transition-colors placeholder:text-gray-600 uppercase text-xs tracking-widest text-center md:text-left"
            />
            <button
              type="submit"
              className="mt-4 md:mt-0 md:ml-8 px-8 py-4 bg-white text-black hover:bg-sphynx-gold transition-colors duration-300 uppercase text-xs font-bold tracking-widest"
            >
              Join
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;