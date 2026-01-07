const express = require('express');
const router = express.Router();
const Setting = require('../models/Setting');
const { protect, admin } = require('../middleware/authMiddleware');

// Get Settings (Create default if not exists)
router.get('/', async (req, res) => {
  let settings = await Setting.findOne();
  if(!settings) {
    settings = await Setting.create({ 
      siteName: 'Sphynx Black', 
      currency: 'USD',
      maintenanceMode: false 
    });
  }
  res.json(settings);
});

// Update Settings
router.put('/', protect, admin, async (req, res) => {
  let settings = await Setting.findOne();
  if(settings) {
    Object.assign(settings, req.body);
    const updated = await settings.save();
    res.json(updated);
  }
});

module.exports = router;