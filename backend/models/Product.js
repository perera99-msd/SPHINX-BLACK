const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  discountPrice: { type: Number },
  stock: { type: Number, required: true, default: 0 },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  images: [{
    url: String,
    alt: String
  }],
  sizes: [String], // e.g., ["S", "M", "L"]
  colors: [{
    name: String,
    code: String // e.g., "#000000"
  }],
  featured: { type: Boolean, default: false },
  newArrival: { type: Boolean, default: false },
  sale: { type: Boolean, default: false },
  bestSeller: { type: Boolean, default: false },
  specifications: {
    material: String,
    origin: String,
    care: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);