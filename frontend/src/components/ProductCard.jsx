import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowUpRight, Check } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import { getImageUrl } from '../utils/imageHelper';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const [addedSize, setAddedSize] = useState(null);

  if (!product) return null;

  // 1. Image Logic
  const firstImage = getImageUrl(product.images?.[0]?.url || product.image);
  const secondImage = product.images?.[1] ? getImageUrl(product.images[1].url) : firstImage;

  // 2. Data
  const sizes = product.sizes || [];
  const colors = product.colors || [];
  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;

  // 3. Quick Add Handler
  const handleQuickAdd = (e, size) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch(addToCart({
      id: product._id,
      name: product.name,
      price: product.discountPrice || product.price,
      image: firstImage,
      quantity: 1,
      size: size,
      color: colors[0]?.name
    }));

    setAddedSize(size);
    toast.success(`Added Size ${size}`);
    setTimeout(() => setAddedSize(null), 2000);
  };

  return (
    <div 
      className="group w-full flex flex-col gap-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product.slug}`} className="block relative w-full">
        
        {/* --- IMAGE CONTAINER (4:5 PORTRAIT RATIO) --- */}
        <div className="relative w-full aspect-[4/5] bg-sphynx-rich overflow-hidden border border-white/5 bg-gray-900 shadow-xl">
          
          {/* Main Image */}
          <img 
            src={firstImage} 
            alt={product.name}
            loading="lazy"
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1.2s] ease-out ${
              isHovered && secondImage !== firstImage ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
            } ${isOutOfStock ? 'grayscale opacity-60' : ''}`}
          />
          
          {/* Second Image (Reveal) */}
          {secondImage !== firstImage && (
            <img 
              src={secondImage} 
              alt={product.name}
              loading="lazy"
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1.2s] ease-out ${
                isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
              }`}
            />
          )}

          {/* --- LUXURY STATUS BADGES --- */}
          <div className="absolute top-3 left-3 flex flex-col gap-2 z-10 pointer-events-none">
            {isOutOfStock ? (
              <span className="bg-red-900/90 backdrop-blur-md text-white text-[9px] font-bold px-3 py-1.5 uppercase tracking-[0.2em] border border-red-500/20 shadow-lg">
                Sold Out
              </span>
            ) : (
              <>
                {/* 1. Best Seller (Gold) */}
                {product.bestSeller && (
                  <span className="bg-sphynx-gold backdrop-blur-md text-black text-[9px] font-bold px-3 py-1.5 uppercase tracking-[0.2em] shadow-lg flex items-center gap-1">
                    Best Seller
                  </span>
                )}
                
                {/* 2. New Arrival (Clean White) */}
                {product.newArrival && (
                  <span className="bg-white/95 backdrop-blur-md text-black text-[9px] font-bold px-3 py-1.5 uppercase tracking-[0.2em] shadow-lg border border-white">
                    New In
                  </span>
                )}
                
                {/* 3. Sale (Red Accent) */}
                {product.sale && (
                  <span className="bg-black/80 backdrop-blur-md text-white text-[9px] font-bold px-3 py-1.5 uppercase tracking-[0.2em] shadow-lg border border-white/10">
                    Sale
                  </span>
                )}

                {/* 4. Featured (Subtle) */}
                {product.featured && !product.bestSeller && !product.newArrival && (
                  <span className="bg-black/60 backdrop-blur-md text-white/80 text-[9px] font-medium px-3 py-1.5 uppercase tracking-[0.2em] border border-white/10">
                    Featured
                  </span>
                )}
              </>
            )}
          </div>

          {/* --- FLOATING QUICK ADD (Slide Up) --- */}
          {/* This bar appears cleanly at the bottom of the image */}
          <div className={`absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent pt-10 pb-4 px-4 transition-all duration-500 transform ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {!isOutOfStock && sizes.length > 0 ? (
                sizes.slice(0, 4).map((size) => (
                  <button
                    key={size}
                    onClick={(e) => handleQuickAdd(e, size)}
                    className={`h-8 min-w-[32px] px-2 flex items-center justify-center text-[10px] font-bold border backdrop-blur-sm transition-all duration-300 ${
                      addedSize === size 
                        ? 'bg-sphynx-gold border-sphynx-gold text-black' 
                        : 'border-white/30 text-white hover:bg-white hover:text-black hover:border-white'
                    }`}
                  >
                    {addedSize === size ? <Check size={12} /> : size}
                  </button>
                ))
              ) : (
                <span className="text-[10px] uppercase tracking-widest text-white/70 border-b border-white/30 pb-0.5">
                  View Details
                </span>
              )}
              
              {/* Quick Link Icon */}
              <div className="ml-auto text-white hover:text-sphynx-gold transition-colors">
                <ArrowUpRight size={16} strokeWidth={1.5} />
              </div>
            </div>
          </div>

        </div>
      </Link>

      {/* --- INFO SECTION --- */}
      <div className="flex justify-between items-start pt-1 px-1">
        
        {/* Left: Title & Category */}
        <div className="flex flex-col gap-1">
          <h3 className="text-white text-base font-display italic tracking-wide leading-none group-hover:text-sphynx-gold transition-colors duration-500">
            <Link to={`/product/${product.slug}`}>
              {product.name}
            </Link>
          </h3>
          <span className="text-gray-500 text-[9px] uppercase tracking-[0.25em]">
            {product.category?.name || 'Collection'}
          </span>
        </div>

        {/* Right: Price & Colors */}
        <div className="flex flex-col items-end gap-2">
          {product.discountPrice ? (
            <div className="flex flex-col items-end leading-none">
              <span className="text-sphynx-gold text-sm font-display">${product.discountPrice}</span>
              <span className="text-gray-600 text-[10px] line-through">${product.price}</span>
            </div>
          ) : (
            <span className="text-white text-sm font-display tracking-wide">${product.price}</span>
          )}

          {/* Color Dots */}
          {colors.length > 0 && (
            <div className="flex gap-1.5">
              {colors.slice(0, 3).map((col, idx) => (
                <div 
                  key={idx} 
                  className="w-1.5 h-1.5 rounded-full ring-1 ring-white/20"
                  style={{ backgroundColor: col.code }}
                  title={col.name}
                />
              ))}
              {colors.length > 3 && <span className="text-[8px] text-gray-600">+</span>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;