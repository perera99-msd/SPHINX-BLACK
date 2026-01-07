import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Shield, User, Trash2, Search, Calendar } from 'lucide-react';
import axios from '../../utils/axios';
import toast from 'react-hot-toast';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get('/users');
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load users');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user? This cannot be undone.')) {
      try {
        await axios.delete(`/users/${id}`);
        setUsers(users.filter(user => user._id !== id));
        toast.success('User removed successfully');
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to delete user');
      }
    }
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-6">
       <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold mb-2">Users</h1>
          <p className="text-gray-400">Platform access & customer management</p>
        </div>
        
        {/* Search Bar */}
        <div className="relative">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
           <input 
             type="text" 
             placeholder="Search users..." 
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
             className="bg-gray-900 border border-gray-800 rounded-lg pl-10 pr-4 py-2 text-white outline-none focus:border-sphynx-gold w-64" 
           />
        </div>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="text-center text-gray-500 py-10">Loading users...</div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center text-gray-500 py-10">No users found.</div>
        ) : (
          filteredUsers.map((user) => (
            <div key={user._id} className="group flex items-center justify-between bg-gray-900 p-5 rounded-xl border border-gray-800 hover:border-gray-700 transition">
               <div className="flex items-center gap-5">
                  {/* Avatar */}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${user.role === 'admin' ? 'bg-sphynx-gold text-black' : 'bg-gray-800 text-gray-400'}`}>
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  
                  {/* Info */}
                  <div>
                     <p className="text-white font-medium text-lg flex items-center gap-2">
                       {user.name}
                       {user.role === 'admin' && <Shield size={14} className="text-sphynx-gold" />}
                     </p>
                     <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                       <span className="flex items-center gap-1"><Mail size={12} /> {user.email}</span>
                       <span className="flex items-center gap-1"><Calendar size={12} /> Joined {new Date(user.createdAt).toLocaleDateString()}</span>
                     </div>
                  </div>
               </div>

               {/* Actions */}
               <div className="flex items-center gap-4">
                 <span className={`px-3 py-1 rounded-full text-xs uppercase tracking-widest border ${user.role === 'admin' ? 'border-sphynx-gold text-sphynx-gold bg-sphynx-gold/10' : 'border-gray-700 text-gray-400 bg-gray-800'}`}>
                    {user.role}
                 </span>
                 
                 {user.role !== 'admin' && (
                   <button 
                     onClick={() => handleDelete(user._id)}
                     className="p-2 text-gray-600 hover:text-red-400 hover:bg-red-900/10 rounded-lg transition opacity-0 group-hover:opacity-100"
                     title="Delete User"
                   >
                     <Trash2 size={18} />
                   </button>
                 )}
               </div>
            </div>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default Users;