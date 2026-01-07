// src/App.jsx
import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCart } from './redux/slices/cartSlice';
import { Toaster } from 'react-hot-toast';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile'; 
import Collections from './pages/Collections';
import About from './pages/About';

// Admin Pages
import AdminLayout from './components/Admin/AdminLayout';
import AdminLogin from './pages/Admin/AdminLogin'; // Ensure you created this file
import AdminDashboard from './pages/Admin/Dashboard';
import AdminProducts from './pages/Admin/Products';
import AdminCategories from './pages/Admin/Categories';
import AdminOrders from './pages/Admin/Orders';
import AdminUsers from './pages/Admin/Users';
import AdminSettings from './pages/Admin/Settings';

// Layout
import Layout from './components/Layout/Layout';

function App() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);

  // 1. Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // 2. USER SPECIFIC CART LOGIC
  useEffect(() => {
    if (user) {
      // User is logged in: Load THEIR specific cart
      const savedUserCart = localStorage.getItem(`cart_${user._id}`);
      if (savedUserCart) {
        dispatch(setCart(JSON.parse(savedUserCart)));
      }
    } else {
      // User is GUEST: Load guest cart
      const savedGuestCart = localStorage.getItem('cart_guest');
      if (savedGuestCart) {
        dispatch(setCart(JSON.parse(savedGuestCart)));
      }
    }
  }, [user, dispatch]);

  // 3. SAVE CART on every change
  useEffect(() => {
    if (user) {
      localStorage.setItem(`cart_${user._id}`, JSON.stringify(cart));
    } else {
      localStorage.setItem('cart_guest', JSON.stringify(cart));
    }
  }, [cart, user]);

  return (
    <>
      <Toaster position="top-center" toastOptions={{
        style: { background: '#111', color: '#fff', border: '1px solid #333' }
      }} />
      
      <Routes>
        {/* Public Routes (Wrapped in Main Layout) */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="product/:slug" element={<ProductDetail />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />} />
          <Route path="collections" element={<Collections />} />
          <Route path="about" element={<About />} />
        </Route>

        {/* Admin Login (Standalone Page, No Navbar/Footer) */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin Protected Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;