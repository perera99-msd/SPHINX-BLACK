const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { protect, admin } = require('../middleware/authMiddleware');

// @route GET /api/products
// Handles ?limit=x and ?search=x
router.get('/', async (req, res) => {
  try {
    const keyword = req.query.search
      ? { name: { $regex: req.query.search, $options: 'i' } }
      : {};

    const limit = parseInt(req.query.limit) || 100;
    
    const products = await Product.find({ ...keyword })
      .limit(limit)
      .populate('category')
      .sort({ createdAt: -1 });
      
    res.json({ products });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// @route GET /api/products/:slug
// Note: Frontend sends slug (e.g., /products/black-hoodie), 
// but sometimes Admin sends ID for delete. We handle both.
router.get('/:idOrSlug', async (req, res) => {
  try {
    let product;
    // Check if valid ObjectId
    if (req.params.idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
      product = await Product.findById(req.params.idOrSlug).populate('category');
    } else {
      product = await Product.findOne({ slug: req.params.idOrSlug }).populate('category');
    }

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// @route POST /api/products (Admin)
router.post('/', protect, admin, async (req, res) => {
  try {
    const product = new Product(req.body);
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

// @route PUT /api/products/:id (Admin)
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      Object.assign(product, req.body);
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) { res.status(400).json({ message: err.message }); }
});

// @route DELETE /api/products/:id (Admin)
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.deleteOne();
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;