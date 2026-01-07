import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; 
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Package,
  Tag,
  ShoppingCart,
  Users,
  Settings,
  Menu,
  X,
  LogOut
} from 'lucide-react';
import toast from 'react-hot-toast';
import { logout } from '../../redux/slices/authSlice'; 

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch(); 
  const navigate = useNavigate();

  // --- FIXED PROTECTION LOGIC ---
  useEffect(() => {
    // If not logged in, OR if logged in but not an admin
    if (!user || user.role !== 'admin') {
      // Redirect to ADMIN login, not the standard login
      navigate('/admin/login');
    }
  }, [user, navigate]);

  // Prevent flash of content if not authorized
  if (!user || user.role !== 'admin') {
    return null; 
  }

  const navItems = [
    { to: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/admin/products', icon: Package, label: 'Products' },
    { to: '/admin/categories', icon: Tag, label: 'Categories' },
    { to: '/admin/orders', icon: ShoppingCart, label: 'Orders' },
    { to: '/admin/users', icon: Users, label: 'Users' },
    { to: '/admin/settings', icon: Settings, label: 'Settings' },
  ];

  const handleLogout = () => {
    dispatch(logout()); 
    toast.success('Logged out successfully');
    navigate('/admin/login'); // Redirect to Admin Login on logout
  };

  return (
    <div className="min-h-screen bg-sphynx-black text-sphynx-light">
      {/* Mobile Header */}
      <div className="md:hidden sticky top-0 z-50 bg-sphynx-gray border-b border-gray-900 p-4 flex items-center justify-between">
        <h1 className="text-xl font-display">
          SPHYNX <span className="text-sphynx-gold">ADMIN</span>
        </h1>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 hover:bg-gray-800 rounded-lg transition"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <motion.aside
          initial={{ x: -300 }}
          animate={{ x: sidebarOpen ? 0 : -300 }}
          className={`fixed md:relative z-40 h-screen bg-sphynx-gray border-r border-gray-900 w-64 ${sidebarOpen ? 'block' : 'hidden'} md:block`}
        >
          <div className="p-6 border-b border-gray-900 hidden md:block">
            <h1 className="text-2xl font-display">
              SPHYNX <span className="text-sphynx-gold">ADMIN</span>
            </h1>
            <p className="text-gray-400 text-sm mt-1">Admin Dashboard</p>
          </div>

          <nav className="p-4 space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/admin'}
                onClick={() => window.innerWidth < 768 && setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-sphynx-gold/10 text-sphynx-gold border-l-4 border-sphynx-gold'
                      : 'hover:bg-gray-800 text-gray-300'
                  }`
                }
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-900">
            <button 
              onClick={handleLogout}
              className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors w-full text-red-400"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto h-screen p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;