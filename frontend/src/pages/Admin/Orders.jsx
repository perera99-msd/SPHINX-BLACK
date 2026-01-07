import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Search, CheckCircle, Clock } from 'lucide-react';
import axios from '../../utils/axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get('/orders');
        setOrders(data);
        setLoading(false);
      } catch (error) { setLoading(false); }
    };
    fetchOrders();
  }, []);

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
              <th className="p-4">Payment</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800 text-sm text-gray-300">
            {loading ? <tr><td colSpan="6" className="p-8 text-center">Loading...</td></tr> : orders.map(order => (
              <tr key={order._id} className="hover:bg-gray-800/30">
                <td className="p-4 font-mono text-sphynx-gold">#{order._id.slice(-6)}</td>
                <td className="p-4">{order.user?.name || 'Guest'}</td>
                <td className="p-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="p-4 font-bold">${order.totalPrice?.toFixed(2)}</td>
                <td className="p-4">
                   {order.isPaid 
                     ? <span className="flex items-center gap-1 text-green-400"><CheckCircle size={14}/> Paid</span> 
                     : <span className="flex items-center gap-1 text-yellow-400"><Clock size={14}/> Pending</span>}
                </td>
                <td className="p-4">
                   <span className="px-2 py-1 bg-gray-800 rounded text-xs border border-gray-700">Processing</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default Orders;