const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/', async (req, res) => {
  const categories = await Category.find({});
  res.json(categories);
});

router.post('/', protect, admin, async (req, res) => {
  try {
    const category = new Category(req.body);
    const created = await category.save();
    res.status(201).json(created);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

module.exports = router;