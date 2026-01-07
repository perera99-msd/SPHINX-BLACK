const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect, admin } = require('../middleware/authMiddleware');

// Admin: Get all users
router.get('/', protect, admin, async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// Admin: Delete user
router.delete('/:id', protect, admin, async (req, res) => {
  const user = await User.findById(req.params.id);
  if(user) {
    await user.deleteOne();
    res.json({ message: 'User removed' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// User: Add Address
router.post('/addresses', protect, async (req, res) => {
  const user = await User.findById(req.user._id);
  if(user) {
    user.addresses.push(req.body);
    await user.save();
    res.json(user.addresses);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// User: Update Profile (Password)
router.put('/profile', protect, async (req, res) => {
  const user = await User.findById(req.user._id);
  if(user) {
    if(req.body.password) {
      user.password = req.body.password; 
    }
    const updatedUser = await user.save();
    res.json({ message: 'Profile updated' });
  } else {
     res.status(404).json({ message: 'User not found' });
  }
});

module.exports = router;