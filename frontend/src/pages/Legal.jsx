import React from 'react';
import { motion } from 'framer-motion';

const Section = ({ title, children }) => (
  <div className="mb-12">
    <h3 className="text-white font-display text-xl mb-4">{title}</h3>
    <div className="text-gray-400 font-light text-sm leading-loose space-y-4">
      {children}
    </div>
  </div>
);

const Legal = () => {
  return (
    <div className="min-h-screen bg-sphynx-black pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-3xl">
        
        <div className="mb-16 border-b border-white/10 pb-8">
          <h1 className="text-4xl md:text-6xl font-display text-white mb-4">Terms of Service</h1>
          <p className="text-gray-500 text-xs uppercase tracking-widest">
            Last Updated: January 13, 2026
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.8 }}
        >
          <Section title="1. Introduction">
            <p>Welcome to SPHYNX. By accessing our website, you agree to be bound by these Terms of Service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.</p>
          </Section>

          <Section title="2. Intellectual Property">
            <p>The content, organization, graphics, design, compilation, and other matters related to the Site are protected under applicable copyrights and other proprietary (including but not limited to intellectual property) rights. The copying, redistribution, use, or publication by you of any such matters or any part of the Site is strictly prohibited.</p>
          </Section>

          <Section title="3. Purchase & Payment">
            <p>Prices for our products are subject to change without notice. We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time.</p>
            <p>We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household or per order.</p>
          </Section>

          <Section title="4. Privacy">
            <p>Your submission of personal information through the store is governed by our Privacy Policy. We do not sell or share your private data with third parties beyond what is strictly necessary for order fulfillment.</p>
          </Section>

          <Section title="5. Governing Law">
            <p>These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of Sri Lanka.</p>
          </Section>

        </motion.div>
      </div>
    </div>
  );
};

export default Legal;