// src/pages/Admin/Orders.jsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Search, CheckCircle, Clock, Truck, Package } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from '../../utils/axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get('/orders');
      setOrders(data);
      setLoading(false);
    } catch (error) { 
      toast.error('Failed to load orders');
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const markAsDelivered = async (id) => {
    if(!window.confirm('Mark this order as Delivered?')) return;
    
    try {
      await axios.put(`/orders/${id}/deliver`);
      toast.success('Order status updated');
      fetchOrders(); // Refresh list
    } catch (error) {
      toast.error(error.response?.data?.message || 'Update failed');
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold">Orders</h1>
        <p className="text-gray-400">Track and manage customer orders</p>
      </div>

      <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-800 text-gray-400 uppercase text-xs">
            <tr>
              <th className="p-4">Order ID</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Date</th>
              <th className="p-4">Total</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800 text-sm text-gray-300">
            {loading ? (
              <tr><td colSpan="6" className="p-8 text-center text-gray-500">Loading orders...</td></tr>
            ) : orders.length === 0 ? (
              <tr><td colSpan="6" className="p-8 text-center text-gray-500">No orders found.</td></tr>
            ) : (
              orders.map(order => (
                <tr key={order._id} className="hover:bg-gray-800/30 transition">
                  <td className="p-4 font-mono text-sphynx-gold">#{order._id.slice(-6).toUpperCase()}</td>
                  <td className="p-4">
                    <p className="font-bold text-white">{order.user?.name || 'Guest'}</p>
                    <p className="text-xs text-gray-500">{order.shippingAddress?.city}, {order.shippingAddress?.country}</p>
                  </td>
                  <td className="p-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="p-4 font-bold text-white">${order.totalPrice?.toFixed(2)}</td>
                  <td className="p-4">
                    <div className="flex flex-col gap-1">
                       {/* Payment Status */}
                       {order.isPaid 
                         ? <span className="flex items-center gap-1 text-green-400 text-xs"><CheckCircle size={12}/> Paid</span> 
                         : <span className="flex items-center gap-1 text-yellow-400 text-xs"><Clock size={12}/> Unpaid</span>}
                       
                       {/* Delivery Status */}
                       {order.isDelivered 
                         ? <span className="flex items-center gap-1 text-blue-400 text-xs"><Package size={12}/> Delivered</span> 
                         : <span className="flex items-center gap-1 text-gray-400 text-xs"><Truck size={12}/> Processing</span>}
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    {!order.isDelivered && (
                      <button 
                        onClick={() => markAsDelivered(order._id)}
                        className="bg-gray-800 hover:bg-sphynx-gold hover:text-black text-gray-300 px-3 py-1.5 rounded text-xs uppercase font-bold transition mr-2"
                        title="Mark as Delivered"
                      >
                        Mark Shipped
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default Orders;