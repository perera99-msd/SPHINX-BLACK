import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { 
  Minus, Plus, ShoppingBag, ChevronDown, 
  ShieldCheck, Globe, Ruler, Share2 
} from 'lucide-react';
import toast from 'react-hot-toast';

import axios from '../utils/axios';
import { addToCart } from '../redux/slices/cartSlice';
import { getImageUrl } from '../utils/imageHelper';

// --- SUB-COMPONENT: REFINED ACCORDION ---
const Accordion = ({ title, isOpen, onClick, children }) => (
  <div className="border-t border-white/10 group">
    <button 
      onClick={onClick}
      className="w-full py-5 flex justify-between items-center text-left"
    >
      <span className="text-[10px] uppercase tracking-[0.25em] text-white/60 group-hover:text-sphynx-gold transition-colors duration-300">
        {title}
      </span>
      <span className={`text-white/40 group-hover:text-white transition-all duration-300 ${isOpen ? 'rotate-180' : ''}`}>
        <ChevronDown size={14} strokeWidth={1.5} />
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
          <div className="pb-6 text-sm font-light text-gray-400 leading-loose">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

// --- MAIN PAGE ---
const ProductDetail = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/products/${slug}`);
        setProduct(data);
        if (data.sizes?.length > 0) setSelectedSize(data.sizes[0]);
        if (data.colors?.length > 0) setSelectedColor(data.colors[0]);
        setLoading(false);
      } catch (error) {
        toast.error('Artifact unavailable');
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  const handleAddToCart = () => {
    if (!product) return;
    dispatch(addToCart({
      id: product._id,
      name: product.name,
      price: product.discountPrice || product.price,
      image: getImageUrl(product.images?.[0]?.url || product.image), 
      quantity,
      size: selectedSize,
      color: selectedColor?.name
    }));
    toast.success('Added to Bag');
  };

  const toggleAccordion = (id) => setActiveAccordion(activeAccordion === id ? null : id);

  if (loading) return (
    <div className="h-screen w-full bg-sphynx-black flex flex-col items-center justify-center">
      <div className="w-[1px] h-16 bg-sphynx-gold animate-pulse mb-4"></div>
      <span className="text-[10px] uppercase tracking-[0.3em] text-sphynx-gold">Loading</span>
    </div>
  );

  if (!product) return null;

  const isOutOfStock = product.stock <= 0;

  return (
    <div className="bg-sphynx-black min-h-screen text-white pt-24 pb-20 selection:bg-sphynx-gold selection:text-black font-body">
      
      {/* 1. MINIMAL BREADCRUMBS */}
      <div className="fixed top-0 left-0 w-full z-40 px-6 md:px-12 py-6 flex justify-between items-center pointer-events-none mix-blend-difference">
        <div className="pointer-events-auto flex items-center gap-3 text-[9px] uppercase tracking-[0.2em] text-white/50">
          <Link to="/shop" className="hover:text-white transition-colors">Collection</Link>
          <span className="text-white/20">/</span>
          <span className="text-white">{product.category?.name}</span>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          
          {/* --- LEFT: 4:5 PORTRAIT GALLERY (60%) --- */}
          <div className="w-full lg:w-[60%] flex flex-col gap-4">
            {product.images && product.images.length > 0 ? (
              product.images.map((img, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  key={idx} 
                  className="w-full aspect-[4/5] bg-[#080808] relative overflow-hidden group"
                >
                  <img 
                    src={getImageUrl(img.url)} 
                    alt={product.name}
                    className="w-full h-full object-cover opacity-90 transition-transform duration-[1.5s] ease-out group-hover:scale-105 group-hover:opacity-100"
                  />
                </motion.div>
              ))
            ) : (
              <div className="w-full aspect-[4/5] bg-[#080808] flex items-center justify-center border border-white/5">
                <span className="text-white/20 text-xs uppercase tracking-widest">No Imagery</span>
              </div>
            )}
          </div>

          {/* --- RIGHT: STICKY INFO PANEL (40%) --- */}
          <div className="w-full lg:w-[40%] relative">
            <div className="lg:sticky lg:top-32 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto no-scrollbar pr-4">
              
              {/* Header */}
              <div className="mb-10">
                <div className="flex justify-between items-start mb-4">
                   <h1 className="text-4xl md:text-5xl lg:text-6xl font-display italic text-white leading-[0.95] tracking-tight">
                     {product.name}
                   </h1>
                   <button className="text-white/40 hover:text-sphynx-gold transition-colors">
                     <Share2 size={18} strokeWidth={1} />
                   </button>
                </div>
                
                <div className="flex items-center gap-4 border-b border-white/10 pb-8">
                  {product.discountPrice ? (
                    <div className="flex items-baseline gap-3">
                      <span className="text-2xl text-sphynx-gold font-display">${product.discountPrice}</span>
                      <span className="text-lg text-gray-600 line-through font-display">${product.price}</span>
                    </div>
                  ) : (
                    <span className="text-2xl text-white font-display tracking-wide">${product.price}</span>
                  )}
                  
                  {product.stock <= 5 && product.stock > 0 && (
                    <span className="text-[9px] uppercase tracking-widest text-red-400 bg-red-900/10 px-2 py-1 border border-red-900/20">
                      Limited Availability
                    </span>
                  )}
                </div>
              </div>

              {/* Narrative */}
              <div className="mb-12">
                <p className="text-gray-400 font-light leading-relaxed text-sm">
                  {product.description}
                </p>
              </div>

              {/* --- SELECTORS --- */}
              <div className="space-y-10 mb-12">
                
                {/* Colors */}
                {product.colors && product.colors.length > 0 && (
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.25em] text-white/50 mb-4 block">
                      Finish: <span className="text-white">{selectedColor?.name}</span>
                    </span>
                    <div className="flex flex-wrap gap-3">
                      {product.colors.map((col) => (
                        <button
                          key={col.name}
                          onClick={() => setSelectedColor(col)}
                          className={`w-10 h-10 flex items-center justify-center transition-all duration-300 border ${
                            selectedColor?.name === col.name 
                              ? 'border-sphynx-gold' 
                              : 'border-white/10 hover:border-white/30'
                          }`}
                        >
                           <div 
                             className="w-6 h-6 border border-white/10" 
                             style={{ backgroundColor: col.code }} 
                           />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sizes */}
                {product.sizes && product.sizes.length > 0 && (
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-[10px] uppercase tracking-[0.25em] text-white/50">
                        Size: <span className="text-white">{selectedSize}</span>
                      </span>
                      <button className="flex items-center gap-2 text-[9px] uppercase tracking-widest text-white/50 hover:text-white transition-colors">
                        <Ruler size={12} /> Guide
                      </button>
                    </div>
                    <div className="grid grid-cols-4 gap-3">
                      {product.sizes.map(size => (
                        <button 
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`h-12 flex items-center justify-center text-xs font-bold uppercase tracking-widest transition-all duration-300 border ${
                            selectedSize === size 
                              ? 'bg-white text-black border-white' 
                              : 'border-white/10 text-gray-500 hover:text-white hover:border-white/50 bg-transparent'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* --- ACTION AREA --- */}
              <div className="flex flex-col gap-6 mb-16">
                {isOutOfStock ? (
                   <button disabled className="w-full py-5 border border-white/10 text-white/30 uppercase tracking-[0.25em] text-xs font-bold cursor-not-allowed bg-white/5">
                     Sold Out
                   </button>
                ) : (
                  <div className="flex flex-col gap-4">
                    <div className="flex gap-4">
                      {/* Quantity */}
                      <div className="w-32 border border-white/20 flex items-center justify-between transition-colors hover:border-white/40">
                        <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="h-14 w-10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"><Minus size={12} /></button>
                        <span className="text-sm font-display text-white">{quantity}</span>
                        <button onClick={() => setQuantity(quantity + 1)} className="h-14 w-10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"><Plus size={12} /></button>
                      </div>
                      
                      {/* Add Button */}
                      <button 
                         onClick={handleAddToCart}
                         className="flex-1 bg-sphynx-gold text-black uppercase tracking-[0.25em] text-xs font-bold hover:bg-white transition-all duration-500 flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(197,160,89,0.1)] hover:shadow-[0_0_30px_rgba(197,160,89,0.3)]"
                      >
                         <ShoppingBag size={16} strokeWidth={1.5} />
                         <span>Add to Bag — ${(product.discountPrice || product.price) * quantity}</span>
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Trust Badges */}
                <div className="grid grid-cols-2 gap-4 py-6 border-t border-b border-white/10">
                  <div className="flex items-center gap-3 text-white/40">
                    <Globe size={16} className="text-sphynx-gold" strokeWidth={1} />
                    <span className="text-[9px] uppercase tracking-widest">Global Shipping</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/40">
                    <ShieldCheck size={16} className="text-sphynx-gold" strokeWidth={1} />
                    <span className="text-[9px] uppercase tracking-widest">Authentic</span>
                  </div>
                </div>
              </div>

              {/* --- COLLAPSIBLE DETAILS --- */}
              <div className="mb-12">
                <Accordion 
                  title="Composition & Care" 
                  isOpen={activeAccordion === 'specs'} 
                  onClick={() => toggleAccordion('specs')}
                >
                  <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                    {product.specifications?.material && (
                      <div><span className="block text-white/40 text-[9px] uppercase tracking-widest mb-1">Material</span>{product.specifications.material}</div>
                    )}
                    {product.specifications?.origin && (
                      <div><span className="block text-white/40 text-[9px] uppercase tracking-widest mb-1">Origin</span>{product.specifications.origin}</div>
                    )}
                    {product.specifications?.care && (
                      <div className="col-span-2"><span className="block text-white/40 text-[9px] uppercase tracking-widest mb-1">Care</span>{product.specifications.care}</div>
                    )}
                  </div>
                </Accordion>

                <Accordion 
                  title="Shipping & Returns" 
                  isOpen={activeAccordion === 'shipping'} 
                  onClick={() => toggleAccordion('shipping')}
                >
                  <p className="mb-4">
                    Complimentary express shipping on all orders over $500. Orders are dispatched within 24 hours.
                  </p>
                  <p>
                    Returns accepted within 14 days. Items must be in original condition with tags attached.
                  </p>
                </Accordion>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;