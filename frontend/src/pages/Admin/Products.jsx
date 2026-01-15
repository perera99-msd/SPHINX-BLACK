// src/components/Admin/Products.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Search, Edit, Trash2, Plus, X, Check, Upload, Image as ImageIcon } from 'lucide-react';
import axios from '../../utils/axios';
import { getImageUrl } from '../../utils/imageHelper';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchData = async () => {
    try {
      const [prodRes, catRes] = await Promise.all([
        axios.get('/products?limit=1000'),
        axios.get('/categories')
      ]);
      setProducts(prodRes.data.products || []);
      setCategories(catRes.data || []);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to load data');
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Delete this product?')) {
      try {
        await axios.delete(`/products/${id}`);
        setProducts(products.filter(p => p._id !== id));
        toast.success('Product deleted');
      } catch (err) { 
        toast.error('Delete failed'); 
      }
    }
  };

  const handleSave = async (formData) => {
    try {
      if (editingProduct) {
        await axios.put(`/products/${editingProduct._id}`, formData);
        toast.success('Product Updated');
      } else {
        await axios.post('/products', formData);
        toast.success('Product Created');
      }
      setShowModal(false);
      setEditingProduct(null);
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Save failed');
    }
  };

  const filtered = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
    (selectedCategory === 'all' || (p.category?._id === selectedCategory || p.category === selectedCategory))
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold">Products</h1>
          <p className="text-gray-400">Inventory & Catalog Management</p>
        </div>
        <button onClick={() => { setEditingProduct(null); setShowModal(true); }} className="flex items-center gap-2 bg-sphynx-gold text-black px-6 py-3 rounded font-bold uppercase tracking-widest hover:bg-white transition">
          <Plus size={18} /> Add New
        </button>
      </div>

      {/* Filters */}
      <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input 
            className="w-full bg-black border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white focus:border-sphynx-gold outline-none" 
            placeholder="Search products..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <select 
          className="bg-black border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-sphynx-gold outline-none"
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-800/50 text-gray-400 uppercase text-xs">
            <tr>
              <th className="p-4">Product</th>
              <th className="p-4">Price</th>
              <th className="p-4">Total Stock</th>
              <th className="p-4">Flags</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800 text-sm text-gray-300">
            {filtered.map(p => (
              <tr key={p._id} className="hover:bg-gray-800/30">
                <td className="p-4 flex items-center gap-3">
                  <div className="w-12 h-12 bg-black rounded overflow-hidden border border-gray-700">
                    <img 
                      src={getImageUrl(p.images?.[0]?.url) || '/placeholder.jpg'} 
                      alt="" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div>
                    <p className="font-bold text-white">{p.name}</p>
                    <p className="text-xs text-gray-500">{p.category?.name || 'Uncategorized'}</p>
                  </div>
                </td>
                <td className="p-4">
                  {p.discountPrice ? (
                    <div>
                      <span className="text-red-400 font-bold">${p.discountPrice}</span>
                      <span className="text-gray-600 line-through text-xs ml-2">${p.price}</span>
                    </div>
                  ) : (
                    <span className="font-bold">${p.price}</span>
                  )}
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs border ${p.stock > 0 ? 'border-green-900 text-green-500' : 'border-red-900 text-red-500'}`}>
                    {p.stock} units
                  </span>
                </td>
                <td className="p-4 flex gap-1">
                  {p.featured && <span className="w-2 h-2 rounded-full bg-sphynx-gold" title="Featured"></span>}
                  {p.newArrival && <span className="w-2 h-2 rounded-full bg-blue-500" title="New"></span>}
                  {p.sale && <span className="w-2 h-2 rounded-full bg-red-500" title="Sale"></span>}
                </td>
                <td className="p-4 text-right">
                  <button onClick={() => { setEditingProduct(p); setShowModal(true); }} className="p-2 text-blue-400 hover:bg-blue-900/20 rounded"><Edit size={16} /></button>
                  <button onClick={() => handleDelete(p._id)} className="p-2 text-red-400 hover:bg-red-900/20 rounded ml-2"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && <ProductModal product={editingProduct} categories={categories} onClose={() => setShowModal(false)} onSave={handleSave} />}
    </motion.div>
  );
};

// --- PRODUCT MODAL ---
const ProductModal = ({ product, categories, onClose, onSave }) => {
  // Logic to migrate old products to default "Large" size in the UI
  const initialInventory = product?.inventory?.length > 0 
    ? product.inventory 
    : product?.stock > 0 
      ? [{ size: 'L', quantity: product.stock }] // Default legacy stock to Large
      : [];

  const [form, setForm] = useState({
    name: product?.name || '',
    slug: product?.slug || '',
    price: product?.price || '',
    discountPrice: product?.discountPrice || '',
    category: product?.category?._id || product?.category || (categories[0]?._id || ''),
    description: product?.description || '',
    featured: product?.featured || false,
    newArrival: product?.newArrival || false,
    sale: product?.sale || false,
    bestSeller: product?.bestSeller || false,
    // Composition & Care
    material: product?.specifications?.material || '',
    origin: product?.specifications?.origin || '',
    care: product?.specifications?.care || ''
  });

  const [images, setImages] = useState(product?.images || []);
  const [manualUrl, setManualUrl] = useState('');
  
  // INVENTORY STATE
  const [inventory, setInventory] = useState(initialInventory);
  const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const handleInventoryChange = (size, qty) => {
    const qtyNum = parseInt(qty) || 0;
    setInventory(prev => {
      const existing = prev.find(i => i.size === size);
      if (existing) {
        if (qtyNum === 0) return prev.filter(i => i.size !== size); // Remove if 0
        return prev.map(i => i.size === size ? { ...i, quantity: qtyNum } : i);
      }
      return [...prev, { size, quantity: qtyNum }];
    });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      url: URL.createObjectURL(file), 
      file: file, 
      alt: file.name
    }));
    setImages(prev => [...prev, ...newImages]);
  };

  const handleAddUrl = () => {
    if (!manualUrl) return;
    setImages(prev => [...prev, { url: manualUrl, alt: 'Product Image' }]);
    setManualUrl('');
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading('Saving artifact...');

    try {
      // Process Images
      const processedImages = await Promise.all(
        images.map(async (img) => {
          if (img.file) {
            const formData = new FormData();
            formData.append('image', img.file);
            try {
              const { data } = await axios.post('/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
              });
              return { url: data, alt: img.alt || form.name };
            } catch (err) {
              return null;
            }
          }
          return { url: img.url, alt: img.alt || form.name };
        })
      );

      const validImages = processedImages.filter(img => img !== null);

      const payload = {
        ...form,
        slug: form.slug || form.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
        images: validImages,
        inventory: inventory, // Send array of {size, quantity}
        specifications: {
          material: form.material,
          origin: form.origin,
          care: form.care
        }
      };

      await onSave(payload);
      toast.dismiss(loadingToast);
      
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error('Failed to save product');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-2xl">
        
        <div className="p-6 border-b border-gray-800 flex justify-between items-center bg-gray-900 sticky top-0 z-10">
          <div>
            <h2 className="text-xl font-display font-bold text-white">{product ? 'Edit Product' : 'New Product'}</h2>
            <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Product Details & Gallery</p>
          </div>
          <button onClick={onClose}><X className="text-gray-400 hover:text-white" /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* LEFT COLUMN: Basic Info */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="text-xs uppercase text-gray-500 block mb-2">Product Name</label>
                <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full bg-black border border-gray-700 p-3 rounded text-white focus:border-sphynx-gold outline-none" />
              </div>
              
              <div>
                <label className="text-xs uppercase text-gray-500 block mb-2">Price ($)</label>
                <input type="number" required value={form.price} onChange={e => setForm({...form, price: e.target.value})} className="w-full bg-black border border-gray-700 p-3 rounded text-white focus:border-sphynx-gold outline-none" />
              </div>
              
              <div>
                <label className="text-xs uppercase text-gray-500 block mb-2">Discount ($)</label>
                <input type="number" value={form.discountPrice} onChange={e => setForm({...form, discountPrice: e.target.value})} className="w-full bg-black border border-gray-700 p-3 rounded text-white focus:border-sphynx-gold outline-none" />
              </div>

              <div className="col-span-2">
                <label className="text-xs uppercase text-gray-500 block mb-2">Category</label>
                <select required value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full bg-black border border-gray-700 p-3 rounded text-white focus:border-sphynx-gold outline-none">
                  <option value="" disabled>Select</option>
                  {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs uppercase text-gray-500 block mb-2">Description</label>
              <textarea rows="3" value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full bg-black border border-gray-700 p-3 rounded text-white focus:border-sphynx-gold outline-none" />
            </div>

            {/* --- INVENTORY SECTION --- */}
            <div className="bg-black border border-gray-800 p-4 rounded-xl">
              <label className="text-xs uppercase text-sphynx-gold block mb-4 tracking-widest">Inventory by Size</label>
              <div className="grid grid-cols-3 gap-4">
                {availableSizes.map(size => {
                  const currentQty = inventory.find(i => i.size === size)?.quantity || '';
                  return (
                    <div key={size} className="flex flex-col">
                      <label className="text-[10px] uppercase text-gray-500 mb-1">Size {size}</label>
                      <input 
                        type="number" 
                        min="0"
                        placeholder="0"
                        value={currentQty} 
                        onChange={(e) => handleInventoryChange(size, e.target.value)}
                        className={`w-full bg-gray-900 border p-2 rounded text-white text-center outline-none ${currentQty > 0 ? 'border-sphynx-gold' : 'border-gray-700'}`} 
                      />
                    </div>
                  );
                })}
              </div>
              <p className="text-xs text-gray-500 mt-3 text-right">
                Total Stock: {inventory.reduce((acc, curr) => acc + curr.quantity, 0)}
              </p>
            </div>

            {/* --- COMPOSITION & CARE --- */}
            <div className="bg-black border border-gray-800 p-4 rounded-xl space-y-3">
              <label className="text-xs uppercase text-sphynx-gold block mb-2 tracking-widest">Specifications</label>
              <input placeholder="Material (e.g. 100% Organic Cotton)" value={form.material} onChange={e => setForm({...form, material: e.target.value})} className="w-full bg-gray-900 border border-gray-700 p-2 rounded text-white text-sm outline-none" />
              <input placeholder="Origin (e.g. Made in Italy)" value={form.origin} onChange={e => setForm({...form, origin: e.target.value})} className="w-full bg-gray-900 border border-gray-700 p-2 rounded text-white text-sm outline-none" />
              <input placeholder="Care (e.g. Dry Clean Only)" value={form.care} onChange={e => setForm({...form, care: e.target.value})} className="w-full bg-gray-900 border border-gray-700 p-2 rounded text-white text-sm outline-none" />
            </div>

          </div>

          {/* RIGHT COLUMN: Images & Toggles */}
          <div className="space-y-6">
             {/* Toggles */}
             <div className="grid grid-cols-2 gap-4 p-4 bg-black rounded-lg border border-gray-800">
               {['featured', 'newArrival', 'sale', 'bestSeller'].map(field => (
                 <label key={field} className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-5 h-5 border rounded flex items-center justify-center transition-colors ${form[field] ? 'bg-sphynx-gold border-sphynx-gold' : 'border-gray-600'}`}>
                      {form[field] && <Check size={14} className="text-black" />}
                    </div>
                    <input type="checkbox" className="hidden" checked={form[field]} onChange={e => setForm({...form, [field]: e.target.checked})} />
                    <span className="text-sm text-gray-400 capitalize group-hover:text-white transition">{field.replace(/([A-Z])/g, ' $1').trim()}</span>
                 </label>
               ))}
            </div>

            <div className="flex justify-between items-end">
               <label className="text-xs uppercase text-gray-500">Media Gallery</label>
               <span className="text-xs text-gray-600">{images.length} items</span>
            </div>

            {/* Upload Area */}
            <div className="bg-black border border-dashed border-gray-700 rounded-xl p-6 text-center hover:border-sphynx-gold transition-colors group relative">
               <input 
                 type="file" 
                 multiple 
                 accept="image/*" 
                 onChange={handleFileChange}
                 className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
               />
               <div className="flex flex-col items-center justify-center gap-3 relative z-10 pointer-events-none">
                  <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 group-hover:text-sphynx-gold group-hover:bg-gray-700 transition-all">
                     <Upload size={20} />
                  </div>
                  <div>
                     <p className="text-sm text-white font-medium">Click to browse device</p>
                     <p className="text-xs text-gray-500 mt-1">or drag and drop images here</p>
                  </div>
               </div>
            </div>

             {/* URL Input */}
             <div className="flex gap-2">
               <input 
                 value={manualUrl}
                 onChange={e => setManualUrl(e.target.value)}
                 className="flex-grow bg-black border border-gray-700 px-4 py-2 rounded text-sm text-white outline-none focus:border-sphynx-gold"
                 placeholder="Or paste image URL"
               />
               <button type="button" onClick={handleAddUrl} className="bg-gray-800 text-white px-4 py-2 rounded text-xs uppercase font-bold hover:bg-gray-700">Add</button>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-3 gap-3 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
               {images.map((img, idx) => (
                 <div key={idx} className="relative aspect-square group border border-gray-800 rounded-lg overflow-hidden">
                    <img src={getImageUrl(img.url)} alt="preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                       <button type="button" onClick={() => removeImage(idx)} className="p-2 bg-red-900/80 text-white rounded-full hover:bg-red-600 transition"><Trash2 size={16} /></button>
                    </div>
                 </div>
               ))}
               {images.length === 0 && (
                 <div className="col-span-3 py-8 text-center border border-dashed border-gray-800 rounded-lg">
                    <ImageIcon size={24} className="mx-auto text-gray-600 mb-2" />
                    <span className="text-xs text-gray-500">No images selected</span>
                 </div>
               )}
            </div>
          </div>

          <div className="col-span-1 lg:col-span-2 flex justify-end gap-3 pt-6 border-t border-gray-800">
            <button type="button" onClick={onClose} className="px-6 py-3 rounded text-gray-400 hover:text-white">Cancel</button>
            <button type="submit" className="px-8 py-3 bg-sphynx-gold text-black font-bold uppercase tracking-widest rounded hover:bg-white transition">Save Product</button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Products;