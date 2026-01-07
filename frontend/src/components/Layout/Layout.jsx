import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  const { pathname } = useLocation();

  // Scroll to top on route change - Crucial for luxury feel
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-sphynx-black text-sphynx-light selection:bg-sphynx-gold selection:text-black">
      <Navbar />
      
      {/* bg-sphynx-black ensures no white flashes during transitions.
        min-h-screen ensures footer hits bottom.
      */}
      <main className="flex-grow w-full">
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout;