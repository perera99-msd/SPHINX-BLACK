import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Edit, Trash2, Plus, X } from 'lucide-react';
import axios from '../../utils/axios';
import toast from 'react-hot-toast';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [form, setForm] = useState({ name: '', slug: '', description: '' });

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get('/categories');
      setCategories(data);
    } catch (error) { toast.error('Failed to load categories'); }
  };

  useEffect(() => { fetchCategories(); }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Delete this category?')) {
      // Note: Backend endpoint for delete might need to be implemented, assumes standard REST
      toast.error('Delete feature pending backend implementation'); 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        // await axios.put(`/categories/${editingCategory._id}`, form); 
        toast.success('Category Updated (Simulated)');
      } else {
        await axios.post('/categories', form);
        toast.success('Category Created');
      }
      setShowModal(false);
      fetchCategories();
    } catch (error) { toast.error('Operation failed'); }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-display font-bold">Categories</h1>
        <button onClick={() => { setEditingCategory(null); setForm({ name: '', slug: '', description: '' }); setShowModal(true); }} className="flex items-center gap-2 bg-sphynx-gold text-black px-4 py-2 rounded font-bold hover:bg-white transition">
           <Plus size={18} /> Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {categories.map(cat => (
            <div key={cat._id} className="bg-gray-900 border border-gray-800 rounded-xl p-6 group">
               <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-display text-white">{cat.name}</h3>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                     <button onClick={() => { setEditingCategory(cat); setForm(cat); setShowModal(true); }} className="p-1 hover:text-blue-400"><Edit size={16} /></button>
                     <button onClick={() => handleDelete(cat._id)} className="p-1 hover:text-red-400"><Trash2 size={16} /></button>
                  </div>
               </div>
               <p className="text-gray-500 text-sm">{cat.description || 'No description'}</p>
            </div>
         ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-xl w-full max-w-md p-6">
             <div className="flex justify-between mb-6">
                <h2 className="text-xl font-bold text-white">{editingCategory ? 'Edit' : 'New'} Category</h2>
                <button onClick={() => setShowModal(false)}><X className="text-gray-400" /></button>
             </div>
             <form onSubmit={handleSubmit} className="space-y-4">
                <input required placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full bg-black border border-gray-700 p-3 rounded text-white outline-none" />
                <input required placeholder="Slug" value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} className="w-full bg-black border border-gray-700 p-3 rounded text-white outline-none" />
                <textarea placeholder="Description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full bg-black border border-gray-700 p-3 rounded text-white outline-none" />
                <button type="submit" className="w-full bg-sphynx-gold text-black font-bold py-3 rounded uppercase tracking-widest hover:bg-white transition">Save</button>
             </form>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Categories;