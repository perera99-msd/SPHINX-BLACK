import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Lock, Bell, Store, Globe, Mail } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from '../../utils/axios'; //

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [isLoading, setIsLoading] = useState(false);

  // State
  const [settings, setSettings] = useState({
    siteName: '',
    supportEmail: '',
    currency: 'USD',
    maintenanceMode: false,
    orderNotifications: true,
    marketingEmails: false
  });

  const [security, setSecurity] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // 1. Fetch Settings on Load
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data } = await axios.get('/settings');
        setSettings(data);
      } catch (error) {
        console.error('Error fetching settings', error);
      }
    };
    fetchSettings();
  }, []);

  // 2. Handle Save Logic
  const handleSave = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (activeTab === 'security') {
        // Handle Password Change
        if (security.newPassword !== security.confirmPassword) {
          toast.error("New passwords don't match");
          setIsLoading(false);
          return;
        }
        await axios.put('/settings/password', {
          currentPassword: security.currentPassword,
          newPassword: security.newPassword
        });
        toast.success('Password updated successfully');
        setSecurity({ currentPassword: '', newPassword: '', confirmPassword: '' });
      } else {
        // Handle General Settings Update
        await axios.put('/settings', settings);
        toast.success('Settings saved successfully');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Save failed');
    } finally {
      setIsLoading(false);
    }
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Store },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold mb-2">Settings</h1>
        <p className="text-gray-400">Manage your store preferences</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-64 flex-shrink-0 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-sphynx-gold text-black font-bold'
                  : 'bg-gray-900 text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <tab.icon size={18} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1">
          <form onSubmit={handleSave} className="bg-gray-900 rounded-xl border border-gray-800 p-8">
            
            {/* GENERAL TAB */}
            {activeTab === 'general' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <h2 className="text-xl font-display text-white mb-6">Store Details</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Store Name</label>
                    <div className="relative">
                      <Store className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                      <input type="text" value={settings.siteName} onChange={(e) => setSettings({...settings, siteName: e.target.value})} className="w-full bg-black border border-gray-800 rounded-lg pl-10 pr-4 py-3 text-white focus:border-sphynx-gold outline-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Support Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                      <input type="email" value={settings.supportEmail} onChange={(e) => setSettings({...settings, supportEmail: e.target.value})} className="w-full bg-black border border-gray-800 rounded-lg pl-10 pr-4 py-3 text-white focus:border-sphynx-gold outline-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Currency</label>
                    <select value={settings.currency} onChange={(e) => setSettings({...settings, currency: e.target.value})} className="w-full bg-black border border-gray-800 rounded-lg px-4 py-3 text-white focus:border-sphynx-gold outline-none">
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                    </select>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-medium">Maintenance Mode</h3>
                      <p className="text-sm text-gray-500">Disable store access for visitors</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={settings.maintenanceMode} onChange={(e) => setSettings({...settings, maintenanceMode: e.target.checked})} className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sphynx-gold"></div>
                    </label>
                  </div>
                </div>
              </motion.div>
            )}

            {/* SECURITY TAB */}
            {activeTab === 'security' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <h2 className="text-xl font-display text-white mb-6">Change Password</h2>
                <div className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Current Password</label>
                    <input type="password" value={security.currentPassword} onChange={(e) => setSecurity({...security, currentPassword: e.target.value})} className="w-full bg-black border border-gray-800 rounded-lg px-4 py-3 text-white focus:border-sphynx-gold outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">New Password</label>
                    <input type="password" value={security.newPassword} onChange={(e) => setSecurity({...security, newPassword: e.target.value})} className="w-full bg-black border border-gray-800 rounded-lg px-4 py-3 text-white focus:border-sphynx-gold outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Confirm New Password</label>
                    <input type="password" value={security.confirmPassword} onChange={(e) => setSecurity({...security, confirmPassword: e.target.value})} className="w-full bg-black border border-gray-800 rounded-lg px-4 py-3 text-white focus:border-sphynx-gold outline-none" />
                  </div>
                </div>
              </motion.div>
            )}

            {/* NOTIFICATIONS TAB */}
            {activeTab === 'notifications' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <h2 className="text-xl font-display text-white mb-6">Email Preferences</h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-black/30 rounded-lg border border-gray-800">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-gray-800 rounded-lg text-sphynx-gold"><Globe size={20} /></div>
                      <div><h3 className="text-white font-medium">Order Notifications</h3><p className="text-sm text-gray-500">Receive emails when a new order is placed</p></div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={settings.orderNotifications} onChange={(e) => setSettings({...settings, orderNotifications: e.target.checked})} className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sphynx-gold"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-black/30 rounded-lg border border-gray-800">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-gray-800 rounded-lg text-sphynx-gold"><Mail size={20} /></div>
                      <div><h3 className="text-white font-medium">Marketing Emails</h3><p className="text-sm text-gray-500">Receive updates about features and tips</p></div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={settings.marketingEmails} onChange={(e) => setSettings({...settings, marketingEmails: e.target.checked})} className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sphynx-gold"></div>
                    </label>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Footer / Submit */}
            <div className="mt-8 pt-6 border-t border-gray-800 flex justify-end">
              <button type="submit" disabled={isLoading} className="flex items-center space-x-2 px-8 py-3 bg-sphynx-gold text-black font-bold uppercase tracking-widest rounded-lg hover:bg-white transition-colors disabled:opacity-50">
                {isLoading ? <span>Saving...</span> : <><Save size={18} /><span>Save Changes</span></>}
              </button>
            </div>

          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default Settings;