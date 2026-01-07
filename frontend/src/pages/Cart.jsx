import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from 'lucide-react';
import { removeFromCart, updateQuantity, clearCart } from '../redux/slices/cartSlice';
import toast from 'react-hot-toast';

const Cart = () => {
  const dispatch = useDispatch();
  const { items, totalQuantity, totalAmount } = useSelector((state) => state.cart);
  const shipping = totalAmount > 0 ? 9.99 : 0;
  const tax = totalAmount * 0.08;
  const grandTotal = totalAmount + shipping + tax;

  const handleQuantityChange = (id, newQuantity) => {
    dispatch(updateQuantity({ id, quantity: newQuantity }));
  };

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
    toast.success('Item removed from cart');
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      dispatch(clearCart());
      toast.success('Cart cleared');
    }
  };

  if (items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-sphynx-black py-20"
      >
        <div className="container mx-auto px-4 text-center">
          <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center rounded-full bg-sphynx-gray">
            <ShoppingBag size={40} className="text-gray-400" />
          </div>
          <h2 className="text-3xl font-display mb-4">Your cart is empty</h2>
          <p className="text-gray-400 mb-8">Looks like you haven't added any items to your cart yet.</p>
          <Link
            to="/shop"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-sphynx-gold text-black rounded-lg hover:bg-yellow-500 transition"
          >
            <ArrowLeft size={20} />
            <span>Continue Shopping</span>
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-sphynx-black py-12"
    >
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-display mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center p-4 bg-sphynx-gray rounded-xl"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 rounded-lg object-cover"
                />
                
                <div className="flex-1 ml-6">
                  <h3 className="font-medium mb-2">{item.name}</h3>
                  <div className="text-sphynx-gold text-lg font-bold">
                    ${item.price.toFixed(2)}
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-3 bg-gray-900 rounded-lg px-3 py-1">
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      className="p-1 hover:text-sphynx-gold transition"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      className="p-1 hover:text-sphynx-gold transition"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <div className="text-right min-w-20">
                    <div className="font-bold">${(item.price * item.quantity).toFixed(2)}</div>
                  </div>

                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="p-2 text-gray-400 hover:text-red-400 transition"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </motion.div>
            ))}

            <div className="flex justify-between pt-6 border-t border-gray-800">
              <Link
                to="/shop"
                className="flex items-center space-x-2 text-gray-400 hover:text-sphynx-gold transition"
              >
                <ArrowLeft size={20} />
                <span>Continue Shopping</span>
              </Link>
              <button
                onClick={handleClearCart}
                className="px-4 py-2 text-red-400 hover:bg-red-900/30 rounded-lg transition"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-sphynx-gray rounded-xl p-6 sticky top-24">
              <h2 className="text-xl font-display mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-400">Items ({totalQuantity})</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-800 pt-4 flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-sphynx-gold">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <button className="w-full py-4 bg-sphynx-gold text-black rounded-lg font-bold hover:bg-yellow-500 transition mb-4">
                Proceed to Checkout
              </button>

              <p className="text-gray-400 text-sm text-center">
                Free shipping on orders over $200
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Cart;