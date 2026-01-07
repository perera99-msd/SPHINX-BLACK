import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  User, Package, MapPin, Settings, LogOut, 
  Plus, Trash2, Key, CheckCircle 
} from 'lucide-react';
import axios from '../utils/axios';
import { logout } from '../redux/slices/authSlice';
import { clearCart } from '../redux/slices/cartSlice';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('orders');

  // Data States
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState(user?.addresses || []); // Init from Redux, verify via API
  const [loading, setLoading] = useState(false);

  // Forms
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [addressForm, setAddressForm] = useState({ name: '', street: '', city: '', postalCode: '', country: '' });
  const [passwordForm, setPasswordForm] = useState({ password: '', confirm: '' });

  // Redirect if not logged in
  useEffect(() => {
    if (!user) navigate('/login');
    // Basic Fetch for fresh data
    const refreshData = async () => {
      try {
        const { data } = await axios.get('/orders/myorders');
        setOrders(data);
        // We could also fetch fresh user data here if needed
      } catch (err) { console.error(err); }
    };
    if(user) refreshData();
  }, [user, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate('/login');
    toast.success('Signed out.');
  };

  // --- ACTIONS ---

  const handleAddAddress = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/users/addresses', addressForm);
      setAddresses(data); // Backend returns updated list
      setIsAddingAddress(false);
      setAddressForm({ name: '', street: '', city: '', postalCode: '', country: '' });
      toast.success('Address added');
    } catch (error) { toast.error('Failed to add address'); }
  };

  const handleDeleteAddress = async (id) => {
    if(!window.confirm("Remove this address?")) return;
    try {
      const { data } = await axios.delete(`/users/addresses/${id}`);
      setAddresses(data);
      toast.success('Address removed');
    } catch (error) { toast.error('Failed to remove'); }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if(passwordForm.password !== passwordForm.confirm) return toast.error("Passwords do not match");
    try {
      await axios.put('/users/profile', { password: passwordForm.password });
      toast.success('Password updated');
      setPasswordForm({ password: '', confirm: '' });
    } catch (error) { toast.error('Update failed'); }
  };

  if (!user) return null;

  const tabs = [
    { id: 'orders', label: 'My Orders', icon: Package },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'settings', label: 'Account Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-sphynx-black pt-28 pb-20 px-4 md:px-8">
      <div className="container mx-auto max-w-6xl">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-white/10 pb-8">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-gradient-to-br from-sphynx-gold to-yellow-700 rounded-full flex items-center justify-center text-3xl font-bold text-black shadow-[0_0_30px_rgba(197,160,89,0.3)]">
              {user.name?.charAt(0)}
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-display text-white">{user.name}</h1>
              <p className="text-sphynx-gold text-sm uppercase tracking-widest mt-1">Member since {new Date(user.createdAt).getFullYear()}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 text-red-400 hover:text-red-300 transition uppercase text-xs font-bold tracking-widest mt-6 md:mt-0">
            <LogOut size={16} /> Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar Nav */}
          <div className="lg:col-span-1 space-y-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-lg transition-all duration-300 text-left border ${
                  activeTab === tab.id 
                    ? 'bg-sphynx-gold text-black border-sphynx-gold font-bold shadow-lg' 
                    : 'bg-white/5 text-gray-400 border-transparent hover:bg-white/10 hover:text-white'
                }`}
              >
                <tab.icon size={18} />
                <span className="text-sm uppercase tracking-wider">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3 bg-gray-900/50 border border-white/5 rounded-2xl p-6 md:p-10 min-h-[500px]">
            <AnimatePresence mode="wait">
              
              {/* --- ORDERS TAB --- */}
              {activeTab === 'orders' && (
                <motion.div 
                  key="orders"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-display text-white mb-6">Order History</h2>
                  {orders.length === 0 ? (
                    <div className="text-center py-20 border border-dashed border-white/10 rounded-xl">
                      <p className="text-gray-500 mb-4">You have not placed any orders yet.</p>
                      <button onClick={() => navigate('/shop')} className="text-sphynx-gold border-b border-sphynx-gold pb-1 text-xs uppercase tracking-widest">Start Shopping</button>
                    </div>
                  ) : (
                    orders.map(order => (
                      <div key={order._id} className="bg-black border border-white/10 rounded-xl p-6 hover:border-sphynx-gold/50 transition duration-300">
                        <div className="flex justify-between items-start mb-4 border-b border-white/10 pb-4">
                           <div>
                             <span className="text-sphynx-gold text-xs font-mono">#{order._id.slice(-6).toUpperCase()}</span>
                             <p className="text-gray-500 text-xs mt-1">{new Date(order.createdAt).toLocaleDateString()}</p>
                           </div>
                           <div className="text-right">
                             <p className="text-white font-display text-lg">${order.totalPrice}</p>
                             <span className={`text-[10px] uppercase tracking-widest px-2 py-1 rounded ${order.isPaid ? 'bg-green-900/30 text-green-400' : 'bg-yellow-900/30 text-yellow-400'}`}>
                               {order.isPaid ? 'Paid' : 'Pending'}
                             </span>
                           </div>
                        </div>
                        <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
                           {order.orderItems.map((item, idx) => (
                             <img key={idx} src={item.image} className="w-16 h-20 object-cover rounded border border-white/10" alt="product" />
                           ))}
                        </div>
                      </div>
                    ))
                  )}
                </motion.div>
              )}

              {/* --- ADDRESSES TAB --- */}
              {activeTab === 'addresses' && (
                <motion.div 
                  key="addresses"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                >
                   <div className="flex justify-between items-center mb-8">
                      <h2 className="text-2xl font-display text-white">Saved Addresses</h2>
                      <button onClick={() => setIsAddingAddress(!isAddingAddress)} className="flex items-center gap-2 text-sphynx-gold border border-sphynx-gold px-4 py-2 rounded text-xs uppercase tracking-widest hover:bg-sphynx-gold hover:text-black transition">
                        <Plus size={16}/> New Address
                      </button>
                   </div>

                   {/* Add Form */}
                   <AnimatePresence>
                     {isAddingAddress && (
                       <motion.form 
                         initial={{height:0, opacity:0}} animate={{height:'auto', opacity:1}} exit={{height:0, opacity:0}}
                         onSubmit={handleAddAddress}
                         className="bg-black border border-white/10 p-6 rounded-xl mb-8 overflow-hidden"
                       >
                          <h3 className="text-white text-sm uppercase tracking-widest mb-4">New Destination</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                             <input required placeholder="Location Name (e.g. Home)" value={addressForm.name} onChange={e=>setAddressForm({...addressForm, name:e.target.value})} className="bg-gray-900 border border-white/10 p-3 text-white focus:border-sphynx-gold outline-none rounded" />
                             <input required placeholder="Street Address" value={addressForm.street} onChange={e=>setAddressForm({...addressForm, street:e.target.value})} className="bg-gray-900 border border-white/10 p-3 text-white focus:border-sphynx-gold outline-none rounded" />
                             <input required placeholder="City" value={addressForm.city} onChange={e=>setAddressForm({...addressForm, city:e.target.value})} className="bg-gray-900 border border-white/10 p-3 text-white focus:border-sphynx-gold outline-none rounded" />
                             <input required placeholder="Postal Code" value={addressForm.postalCode} onChange={e=>setAddressForm({...addressForm, postalCode:e.target.value})} className="bg-gray-900 border border-white/10 p-3 text-white focus:border-sphynx-gold outline-none rounded" />
                             <input required placeholder="Country" value={addressForm.country} onChange={e=>setAddressForm({...addressForm, country:e.target.value})} className="bg-gray-900 border border-white/10 p-3 text-white focus:border-sphynx-gold outline-none rounded md:col-span-2" />
                          </div>
                          <div className="flex justify-end gap-2">
                             <button type="button" onClick={() => setIsAddingAddress(false)} className="px-4 py-2 text-gray-400 hover:text-white">Cancel</button>
                             <button type="submit" className="px-6 py-2 bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-sphynx-gold">Save</button>
                          </div>
                       </motion.form>
                     )}
                   </AnimatePresence>

                   {/* Address Grid */}
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {addresses.map((addr) => (
                        <div key={addr._id} className="relative bg-black border border-white/10 p-6 rounded-xl group hover:border-white/30 transition">
                           <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition">
                              <button onClick={() => handleDeleteAddress(addr._id)} className="text-gray-500 hover:text-red-400"><Trash2 size={16}/></button>
                           </div>
                           <div className="flex items-center gap-2 mb-3">
                             <MapPin size={16} className="text-sphynx-gold" />
                             <span className="text-white font-bold uppercase tracking-wider text-sm">{addr.name}</span>
                             {addr.isDefault && <span className="text-[9px] bg-sphynx-gold/20 text-sphynx-gold px-2 py-0.5 rounded">Default</span>}
                           </div>
                           <div className="text-gray-400 text-sm leading-relaxed">
                             <p>{addr.street}</p>
                             <p>{addr.city}, {addr.postalCode}</p>
                             <p>{addr.country}</p>
                           </div>
                        </div>
                      ))}
                      {addresses.length === 0 && !isAddingAddress && (
                        <div className="col-span-full text-center text-gray-500 py-10">No addresses saved.</div>
                      )}
                   </div>
                </motion.div>
              )}

              {/* --- SETTINGS TAB --- */}
              {activeTab === 'settings' && (
                <motion.div 
                  key="settings"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  className="max-w-xl"
                >
                  <h2 className="text-2xl font-display text-white mb-6">Security</h2>
                  
                  <div className="bg-black border border-white/10 p-6 rounded-xl">
                     <h3 className="flex items-center gap-2 text-white text-sm uppercase tracking-widest mb-6">
                       <Key size={16} className="text-sphynx-gold" /> Change Password
                     </h3>
                     <form onSubmit={handleUpdatePassword} className="space-y-4">
                        <div>
                           <label className="text-xs text-gray-500 block mb-2">New Password</label>
                           <input type="password" value={passwordForm.password} onChange={e=>setPasswordForm({...passwordForm, password:e.target.value})} className="w-full bg-gray-900 border border-white/10 p-3 text-white focus:border-sphynx-gold outline-none rounded" />
                        </div>
                        <div>
                           <label className="text-xs text-gray-500 block mb-2">Confirm Password</label>
                           <input type="password" value={passwordForm.confirm} onChange={e=>setPasswordForm({...passwordForm, confirm:e.target.value})} className="w-full bg-gray-900 border border-white/10 p-3 text-white focus:border-sphynx-gold outline-none rounded" />
                        </div>
                        <div className="pt-4">
                           <button type="submit" className="bg-sphynx-gold text-black px-6 py-3 font-bold text-xs uppercase tracking-widest hover:bg-white transition w-full md:w-auto rounded">
                             Update Security
                           </button>
                        </div>
                     </form>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;