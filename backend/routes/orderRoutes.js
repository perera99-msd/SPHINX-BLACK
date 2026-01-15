// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product'); 
const { protect, admin } = require('../middleware/authMiddleware');

// @route POST /api/orders
router.post('/', protect, async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body;

  if (orderItems && orderItems.length === 0) {
    return res.status(400).json({ message: 'No order items' });
  }

  try {
    // 1. Validate Stock for Specific Sizes
    for (const item of orderItems) {
      const product = await Product.findById(item.product);
      if (!product) {
        throw new Error(`Product not found: ${item.name}`);
      }

      // Find the specific size in inventory
      // If legacy product (no inventory array), fallback to 'L' or global stock check
      const sizeItem = product.inventory.find(i => i.size === item.size);

      if (product.inventory.length > 0) {
        // Modern Product Logic
        if (!sizeItem) {
          throw new Error(`Size ${item.size} is invalid for ${item.name}`);
        }
        if (sizeItem.quantity < item.quantity) {
          throw new Error(`Insufficient stock for ${item.name} (Size: ${item.size})`);
        }
      } else {
        // Legacy Product Logic (Global Stock)
        if (product.stock < item.quantity) {
          throw new Error(`Insufficient stock for ${item.name}`);
        }
      }
    }

    // 2. Decrement Stock
    for (const item of orderItems) {
      const product = await Product.findById(item.product);

      if (product.inventory.length > 0) {
        // Decrement specific size
        const sizeIndex = product.inventory.findIndex(i => i.size === item.size);
        if (sizeIndex !== -1) {
          product.inventory[sizeIndex].quantity -= item.quantity;
        }
      } else {
        // Decrement global stock (Legacy)
        product.stock -= item.quantity;
      }

      // The pre('save') hook in Product model will automatically recalculate 
      // the global 'stock' number based on the updated inventory array.
      await product.save();
    }

    // 3. Create Order
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      isPaid: true, // Simulation
      paidAt: Date.now()
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);

  } catch (error) {
    res.status(400).json({ message: error.message || 'Order failed' });
  }
});

// @route GET /api/orders/myorders
router.get('/myorders', protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders' });
  }
});

// @route GET /api/orders (Admin)
router.get('/', protect, admin, async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate('user', 'id name email')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders' });
  }
});

// @route PUT /api/orders/:id/deliver (Admin)
router.put('/:id/deliver', protect, admin, async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404).json({ message: 'Order not found' });
  }
});

module.exports = router;