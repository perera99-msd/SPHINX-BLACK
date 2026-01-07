import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../redux/slices/cartSlice';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Checkout = () => {
  const { items, totalAmount } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const handlePayment = (e) => {
    e.preventDefault();
    toast.loading('Processing payment...');
    setTimeout(() => {
      toast.dismiss();
      toast.success('Order placed successfully!');
      dispatch(clearCart());
      navigate('/');
    }, 2000);
  };

  if (items.length === 0) return <div className="min-h-screen bg-sphynx-black text-white p-20 text-center">Your cart is empty.</div>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-sphynx-black pt-20 pb-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-display mb-12 text-white">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left: Forms */}
          <div className="lg:col-span-2 space-y-8">
            {/* Step 1: Shipping */}
            <div className={`bg-gray-900/50 p-8 rounded-xl border ${step === 1 ? 'border-sphynx-gold' : 'border-white/5'}`}>
              <h2 className="text-xl font-display text-white mb-6 flex items-center gap-3">
                <span className="bg-sphynx-gold text-black w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                Shipping Details
              </h2>
              {step === 1 && (
                <form className="grid grid-cols-2 gap-6" onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
                   <input required placeholder="First Name" className="bg-black border border-white/10 p-3 text-white focus:border-sphynx-gold outline-none" />
                   <input required placeholder="Last Name" className="bg-black border border-white/10 p-3 text-white focus:border-sphynx-gold outline-none" />
                   <input required placeholder="Address" className="col-span-2 bg-black border border-white/10 p-3 text-white focus:border-sphynx-gold outline-none" />
                   <input required placeholder="City" className="bg-black border border-white/10 p-3 text-white focus:border-sphynx-gold outline-none" />
                   <input required placeholder="Postal Code" className="bg-black border border-white/10 p-3 text-white focus:border-sphynx-gold outline-none" />
                   <button type="submit" className="col-span-2 bg-white text-black py-3 uppercase font-bold text-xs tracking-widest hover:bg-sphynx-gold transition">Continue to Payment</button>
                </form>
              )}
            </div>

            {/* Step 2: Payment */}
            <div className={`bg-gray-900/50 p-8 rounded-xl border ${step === 2 ? 'border-sphynx-gold' : 'border-white/5'}`}>
              <h2 className="text-xl font-display text-white mb-6 flex items-center gap-3">
                <span className="bg-gray-700 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                Payment Method
              </h2>
              {step === 2 && (
                <form className="space-y-6" onSubmit={handlePayment}>
                   <div className="p-4 border border-sphynx-gold/50 bg-sphynx-gold/10 text-sphynx-gold rounded">
                     Credit Card (Secure)
                   </div>
                   <input required placeholder="Card Number" className="w-full bg-black border border-white/10 p-3 text-white focus:border-sphynx-gold outline-none" />
                   <div className="grid grid-cols-2 gap-6">
                      <input required placeholder="MM/YY" className="bg-black border border-white/10 p-3 text-white focus:border-sphynx-gold outline-none" />
                      <input required placeholder="CVC" className="bg-black border border-white/10 p-3 text-white focus:border-sphynx-gold outline-none" />
                   </div>
                   <button type="submit" className="w-full bg-sphynx-gold text-black py-4 uppercase font-bold text-sm tracking-widest hover:bg-yellow-500 transition">Pay ${totalAmount.toFixed(2)}</button>
                   <button onClick={() => setStep(1)} type="button" className="w-full text-gray-500 text-sm hover:text-white">Back to Shipping</button>
                </form>
              )}
            </div>
          </div>

          {/* Right: Summary */}
          <div className="lg:col-span-1">
             <div className="bg-white/5 p-6 rounded-xl sticky top-24">
                <h3 className="text-lg font-display text-white mb-4">In Your Bag</h3>
                <div className="space-y-4 mb-6 max-h-60 overflow-y-auto custom-scrollbar pr-2">
                   {items.map(item => (
                     <div key={item.id} className="flex gap-4">
                        <img src={item.image} alt="" className="w-16 h-20 object-cover rounded" />
                        <div>
                           <p className="text-white text-sm">{item.name}</p>
                           <p className="text-gray-400 text-xs">Qty: {item.quantity}</p>
                           <p className="text-sphynx-gold text-sm">${item.price}</p>
                        </div>
                     </div>
                   ))}
                </div>
                <div className="border-t border-white/10 pt-4 flex justify-between items-center">
                   <span className="text-gray-400">Total</span>
                   <span className="text-2xl font-display text-white">${totalAmount.toFixed(2)}</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Checkout;