import React from 'react';
import { motion } from 'framer-motion';
import { Truck, RefreshCw, ShieldCheck, Globe } from 'lucide-react';

const Shipping = () => {
  const policies = [
    {
      icon: Globe,
      title: "Global Dispatch",
      content: "We provide complimentary express shipping via DHL on all orders exceeding $500. For orders below this threshold, a flat rate of $25 applies worldwide. All shipments are fully insured and require a signature upon delivery."
    },
    {
      icon: Truck,
      title: "Delivery Timelines",
      content: "Orders are processed within 24 hours. \n\nNorth America: 2-4 Business Days\nEurope: 3-5 Business Days\nAsia Pacific: 3-6 Business Days\n\nPre-order items will be dispatched on the date specified at checkout."
    },
    {
      icon: RefreshCw,
      title: "Returns & Exchange",
      content: "We accept returns within 14 days of receipt. Items must be unworn, unwashed, and in their original packaging with all tags attached. To initiate a return, please contact our concierge service."
    },
    {
      icon: ShieldCheck,
      title: "Duties & Taxes",
      content: "For most regions (US, UK, EU, AU), duties and taxes are included in the final price. For other territories, import duties may be collected by the carrier upon delivery."
    }
  ];

  return (
    <div className="min-h-screen bg-sphynx-black pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-4xl">
        
        {/* Header */}
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="text-sphynx-gold text-xs uppercase tracking-[0.4em] block mb-4"
          >
            Client Services
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-display text-white"
          >
            Shipping & Returns
          </motion.h1>
        </div>

        {/* Policy Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {policies.map((policy, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-gray-900/30 border border-white/5 p-8 rounded-xl hover:border-sphynx-gold/30 transition-colors duration-500"
            >
              <policy.icon className="text-sphynx-gold mb-6" size={32} strokeWidth={1} />
              <h3 className="text-xl font-display text-white mb-4">{policy.title}</h3>
              <p className="text-gray-400 font-light leading-relaxed whitespace-pre-line text-sm">
                {policy.content}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-20 text-center border-t border-white/5 pt-10">
          <p className="text-gray-500 text-sm uppercase tracking-widest">
            Questions? Email <a href="mailto:concierge@sphynx.blk" className="text-white hover:text-sphynx-gold transition-colors">concierge@sphynx.blk</a>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Shipping;