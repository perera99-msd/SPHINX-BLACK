import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const FAQItem = ({ question, answer, isOpen, onClick }) => (
  <div className="border-b border-white/10">
    <button 
      onClick={onClick}
      className="w-full py-8 flex justify-between items-center text-left hover:text-sphynx-gold transition-colors"
    >
      <span className="text-lg md:text-xl font-display text-white">{question}</span>
      <span className="text-sphynx-gold">
        {isOpen ? <Minus size={18} /> : <Plus size={18} />}
      </span>
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="overflow-hidden"
        >
          <p className="pb-8 text-gray-400 font-light leading-relaxed text-sm pr-10">
            {answer}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      q: "Where are Sphynx garments manufactured?",
      a: "Our artifacts are designed in Sri Lanka and constructed in limited runs by artisan partners in Japan and Italy, ensuring the highest standards of ethical craftsmanship."
    },
    {
      q: "How do I care for the fabrics?",
      a: "We recommend dry cleaning for all outerwear and silk items. Our cotton essentials should be washed cold on a gentle cycle and air-dried to preserve their structural integrity."
    },
    {
      q: "Can I cancel or modify my order?",
      a: "Due to our rapid dispatch times, orders can only be modified within 1 hour of placement. Please contact our concierge immediately if you need assistance."
    },
    {
      q: "Is packaging sustainable?",
      a: "Yes. We use 100% recycled matte black boxes and biodegradable protective covers. Luxury does not have to come at the cost of the environment."
    },
    {
      q: "Do you offer bespoke sizing?",
      a: "We offer made-to-measure services for our 'Noir' private clients. Please inquire via email to schedule a consultation."
    }
  ];

  return (
    <div className="min-h-screen bg-sphynx-black pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-display text-white mb-2">FAQ</h1>
        <p className="text-gray-500 uppercase tracking-widest text-xs mb-16">Frequently Asked Questions</p>

        <div className="space-y-2">
          {faqs.map((faq, idx) => (
            <FAQItem 
              key={idx}
              question={faq.q}
              answer={faq.a}
              isOpen={activeIndex === idx}
              onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;