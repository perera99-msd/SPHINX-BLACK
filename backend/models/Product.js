const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  discountPrice: { type: Number },
  
  // Total stock (sum of all sizes) - maintained for sorting/filtering
  stock: { type: Number, required: true, default: 0 }, 
  
  // NEW: Inventory Management
  inventory: [{
    size: { type: String, required: true }, // e.g., "S", "M", "L"
    quantity: { type: Number, required: true, default: 0 }
  }],

  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  images: [{
    url: String,
    alt: String
  }],
  
  // Legacy fields (kept for backward compatibility, but inventory replaces sizes array)
  sizes: [String], 
  
  colors: [{
    name: String,
    code: String 
  }],
  
  featured: { type: Boolean, default: false },
  newArrival: { type: Boolean, default: false },
  sale: { type: Boolean, default: false },
  bestSeller: { type: Boolean, default: false },
  
  // Specifications for "Composition & Care"
  specifications: {
    material: String,
    origin: String,
    care: String
  }
}, { timestamps: true });

// Pre-save hook to automatically calculate total stock and sync legacy 'sizes' array
productSchema.pre('save', function(next) {
  if (this.inventory && this.inventory.length > 0) {
    // 1. Calculate total stock
    this.stock = this.inventory.reduce((acc, item) => acc + item.quantity, 0);
    
    // 2. Sync the simple 'sizes' array for easy filtering on frontend
    // Only include sizes that have stock > 0
    this.sizes = this.inventory
      .filter(item => item.quantity > 0)
      .map(item => item.size);
  }
  next();
});

module.exports = mongoose.model('Product', productSchema);