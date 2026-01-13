import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../redux/slices/cartSlice';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { ArrowLeft, Lock } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from '../utils/axios';

const Checkout = () => {
  const { items, totalAmount } = useSelector(state => state.cart);
  const { user } = useSelector(state => state.auth);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Shipping State
  const [shippingAddress, setShippingAddress] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: ''
  });

  // 1. Guest Protection: Redirect to Login if not authenticated
  useEffect(() => {
    if (!user) {
      toast.error("Please login to complete your purchase");
      // Pass the current location so Login can send them back here
      navigate('/login', { state: { from: location } });
    }
  }, [user, navigate, location]);

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 2. Prepare Order Data according to your Mongoose Schema
      const orderData = {
        orderItems: items.map(item => ({
          name: item.name,
          quantity: item.quantity,
          image: item.image,
          price: item.price,
          product: item.id // Map 'id' from cart to 'product' ObjectId for backend
        })),
        shippingAddress: shippingAddress,
        paymentMethod: 'Credit Card', // Simulated for now
        totalPrice: totalAmount
      };

      // 3. Send to Backend
      const { data } = await axios.post('/orders', orderData);

      // 4. Success Handling
      toast.success('Order placed successfully!');
      dispatch(clearCart());
      
      // Redirect to Profile to see the order
      navigate('/profile');

    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Order failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null; // Don't render if redirecting
  if (items.length === 0) return (
    <div className="min-h-screen bg-sphynx-black text-white p-20 flex flex-col items-center justify-center">
      <h2 className="text-2xl font-display mb-4">Your Bag is Empty</h2>
      <Link to="/shop" className="text-sphynx-gold border-b border-sphynx-gold pb-1 text-xs uppercase tracking-widest">Return to Shop</Link>
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-sphynx-black pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl md:text-4xl font-display mb-12 text-white">Secure Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* LEFT COLUMN: Forms */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Step 1: Shipping */}
            <div className={`bg-gray-900/50 p-8 rounded-xl border transition-colors duration-300 ${step === 1 ? 'border-sphynx-gold' : 'border-white/5'}`}>
              <h2 className="text-xl font-display text-white mb-6 flex items-center gap-3">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step === 1 ? 'bg-sphynx-gold text-black' : 'bg-gray-800 text-gray-400'}`}>1</span>
                Shipping Details
              </h2>
              
              {step === 1 ? (
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
                   <div className="md:col-span-2">
                     <label className="block text-xs uppercase text-gray-500 mb-2">Full Name</label>
                     <input disabled value={user.name} className="w-full bg-black/50 border border-white/10 p-3 text-gray-400 cursor-not-allowed rounded" />
                   </div>
                   
                   <div className="md:col-span-2">
                     <label className="block text-xs uppercase text-gray-500 mb-2">Address</label>
                     <input required value={shippingAddress.address} onChange={e => setShippingAddress({...shippingAddress, address: e.target.value})} className="w-full bg-black border border-white/10 p-3 text-white focus:border-sphynx-gold outline-none rounded" placeholder="Street Address" />
                   </div>

                   <div>
                     <label className="block text-xs uppercase text-gray-500 mb-2">City</label>
                     <input required value={shippingAddress.city} onChange={e => setShippingAddress({...shippingAddress, city: e.target.value})} className="w-full bg-black border border-white/10 p-3 text-white focus:border-sphynx-gold outline-none rounded" />
                   </div>

                   <div>
                     <label className="block text-xs uppercase text-gray-500 mb-2">Postal Code</label>
                     <input required value={shippingAddress.postalCode} onChange={e => setShippingAddress({...shippingAddress, postalCode: e.target.value})} className="w-full bg-black border border-white/10 p-3 text-white focus:border-sphynx-gold outline-none rounded" />
                   </div>

                   <div className="md:col-span-2">
                     <label className="block text-xs uppercase text-gray-500 mb-2">Country</label>
                     <input required value={shippingAddress.country} onChange={e => setShippingAddress({...shippingAddress, country: e.target.value})} className="w-full bg-black border border-white/10 p-3 text-white focus:border-sphynx-gold outline-none rounded" />
                   </div>

                   <button type="submit" className="md:col-span-2 bg-white text-black py-4 uppercase font-bold text-xs tracking-widest hover:bg-sphynx-gold transition rounded">
                     Continue to Payment
                   </button>
                </form>
              ) : (
                <div className="flex justify-between items-center text-gray-400 text-sm">
                  <p>{shippingAddress.address}, {shippingAddress.city}</p>
                  <button onClick={() => setStep(1)} className="text-sphynx-gold text-xs uppercase hover:underline">Edit</button>
                </div>
              )}
            </div>

            {/* Step 2: Payment */}
            <div className={`bg-gray-900/50 p-8 rounded-xl border transition-colors duration-300 ${step === 2 ? 'border-sphynx-gold' : 'border-white/5'}`}>
              <h2 className="text-xl font-display text-white mb-6 flex items-center gap-3">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step === 2 ? 'bg-sphynx-gold text-black' : 'bg-gray-800 text-gray-400'}`}>2</span>
                Payment Method
              </h2>
              
              {step === 2 && (
                <form className="space-y-6" onSubmit={handlePayment}>
                   <div className="p-4 border border-sphynx-gold/30 bg-sphynx-gold/5 text-sphynx-gold rounded flex items-center gap-3">
                     <Lock size={16} />
                     <span className="text-sm">Secure Payment Server (Simulated)</span>
                   </div>
                   
                   <div>
                     <label className="block text-xs uppercase text-gray-500 mb-2">Card Number</label>
                     <input required placeholder="0000 0000 0000 0000" className="w-full bg-black border border-white/10 p-3 text-white focus:border-sphynx-gold outline-none rounded" />
                   </div>

                   <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs uppercase text-gray-500 mb-2">Expiry</label>
                        <input required placeholder="MM/YY" className="w-full bg-black border border-white/10 p-3 text-white focus:border-sphynx-gold outline-none rounded" />
                      </div>
                      <div>
                        <label className="block text-xs uppercase text-gray-500 mb-2">CVC</label>
                        <input required placeholder="123" className="w-full bg-black border border-white/10 p-3 text-white focus:border-sphynx-gold outline-none rounded" />
                      </div>
                   </div>

                   <button disabled={loading} type="submit" className="w-full bg-sphynx-gold text-black py-4 uppercase font-bold text-sm tracking-widest hover:bg-white transition rounded disabled:opacity-50">
                     {loading ? 'Processing...' : `Pay $${totalAmount.toFixed(2)}`}
                   </button>
                   
                   <button onClick={() => setStep(1)} type="button" className="w-full text-gray-500 text-xs hover:text-white mt-2">
                     Back to Shipping
                   </button>
                </form>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Summary */}
          <div className="lg:col-span-1">
             <div className="bg-white/5 p-6 rounded-xl sticky top-24 border border-white/5">
                <h3 className="text-lg font-display text-white mb-6">In Your Bag</h3>
                
                <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto custom-scrollbar pr-2">
                   {items.map(item => (
                     <div key={item.id} className="flex gap-4">
                        <img src={item.image} alt="" className="w-16 h-20 object-cover rounded border border-white/10" />
                        <div>
                           <p className="text-white text-sm font-medium">{item.name}</p>
                           <p className="text-gray-500 text-xs mt-1">Qty: {item.quantity}</p>
                           {item.size && <p className="text-gray-500 text-xs">Size: {item.size}</p>}
                           <p className="text-sphynx-gold text-sm mt-1">${item.price}</p>
                        </div>
                     </div>
                   ))}
                </div>

                <div className="border-t border-white/10 pt-4 space-y-2">
                   <div className="flex justify-between text-sm text-gray-400">
                     <span>Subtotal</span>
                     <span>${totalAmount.toFixed(2)}</span>
                   </div>
                   <div className="flex justify-between text-sm text-gray-400">
                     <span>Shipping</span>
                     <span>Free</span>
                   </div>
                   <div className="flex justify-between items-center pt-4 border-t border-white/10">
                     <span className="text-white">Total</span>
                     <span className="text-2xl font-display text-sphynx-gold">${totalAmount.toFixed(2)}</span>
                   </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default Checkout;