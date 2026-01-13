// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product'); // Import Product model
const { protect, admin } = require('../middleware/authMiddleware');

// @route POST /api/orders
// @desc Create new order & Decrement Stock
router.post('/', protect, async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body;

  if (orderItems && orderItems.length === 0) {
    return res.status(400).json({ message: 'No order items' });
  }

  // 1. Start a database session (Optional but recommended for consistency, 
  // keeping it simple here for now using standard logic)
  
  try {
    // Check stock for all items first
    for (const item of orderItems) {
      const product = await Product.findById(item.product);
      if (!product) {
        throw new Error(`Product not found: ${item.name}`);
      }
      if (product.stock < item.quantity) {
        throw new Error(`Insufficient stock for ${item.name}`);
      }
    }

    // 2. Decrement Stock
    for (const item of orderItems) {
      const product = await Product.findById(item.product);
      product.stock = product.stock - item.quantity;
      await product.save();
    }

    // 3. Create Order
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      isPaid: true, // SIMULATION: Since we have no gateway, mark as paid immediately
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
// @desc Mark order as delivered
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