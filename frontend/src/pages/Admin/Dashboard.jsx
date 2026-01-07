import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Package, ShoppingCart, Users, DollarSign, TrendingUp, Activity } from 'lucide-react';
import axios from '../../utils/axios';

const Dashboard = () => {
  const [stats, setStats] = useState({
    revenue: 0,
    orders: 0,
    products: 0,
    users: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [productsRes, ordersRes, usersRes] = await Promise.allSettled([
          axios.get('/products?limit=1000'),
          axios.get('/orders'),
          axios.get('/users') // Note: Ensure you have a users route or this will fail gracefully
        ]);

        const products = productsRes.status === 'fulfilled' ? productsRes.value.data.products || [] : [];
        const orders = ordersRes.status === 'fulfilled' ? ordersRes.value.data : [];
        const users = usersRes.status === 'fulfilled' ? usersRes.value.data : [];

        // Calculate Revenue
        const totalRevenue = orders.reduce((acc, order) => acc + (order.totalPrice || 0), 0);

        setStats({
          revenue: totalRevenue,
          orders: orders.length,
          products: products.length,
          users: users.length || 0 // Fallback if no user endpoint
        });

        setRecentOrders(orders.slice(0, 5)); // Top 5 recent
        setLoading(false);
      } catch (error) {
        console.error("Dashboard Load Error", error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statCards = [
    { title: 'Total Revenue', value: `$${stats.revenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}`, icon: DollarSign, color: 'text-green-400', bg: 'bg-green-900/20' },
    { title: 'Total Orders', value: stats.orders, icon: ShoppingCart, color: 'text-blue-400', bg: 'bg-blue-900/20' },
    { title: 'Products', value: stats.products, icon: Package, color: 'text-purple-400', bg: 'bg-purple-900/20' },
    { title: 'Users', value: stats.users, icon: Users, color: 'text-orange-400', bg: 'bg-orange-900/20' },
  ];

  if (loading) return <div className="p-10 text-center text-gray-500">Loading Dashboard...</div>;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold mb-2">Overview</h1>
        <p className="text-gray-400">Real-time store performance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-900 rounded-xl p-6 border border-gray-800"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-sm mb-1">{stat.title}</p>
                <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
              </div>
              <div className={`p-3 rounded-lg ${stat.bg}`}>
                <stat.icon className={stat.color} size={24} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Orders Section */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
        <h2 className="text-xl font-display mb-6 flex items-center gap-2">
          <Activity size={20} className="text-sphynx-gold" /> Recent Orders
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-800/50 text-gray-400 uppercase text-xs">
              <tr>
                <th className="p-4">Order ID</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800 text-sm">
              {recentOrders.map(order => (
                <tr key={order._id} className="hover:bg-gray-800/30">
                  <td className="p-4 font-mono text-sphynx-gold">#{order._id.slice(-6)}</td>
                  <td className="p-4 text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs ${order.isPaid ? 'bg-green-900/30 text-green-400' : 'bg-yellow-900/30 text-yellow-400'}`}>
                      {order.isPaid ? 'Paid' : 'Pending'}
                    </span>
                  </td>
                  <td className="p-4 text-right font-bold">${order.totalPrice?.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;