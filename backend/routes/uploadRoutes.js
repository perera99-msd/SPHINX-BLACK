// routes/uploadRoutes.js
const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');

// @route POST /api/upload
router.post('/', upload.single('image'), (req, res) => {
  if (req.file) {
    // Cloudinary returns the full URL in req.file.path
    res.status(200).send(req.file.path);
  } else {
    res.status(400).send('No file uploaded');
  }
});

module.exports = router;