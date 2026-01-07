const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');

// @route POST /api/upload
router.post('/', upload.single('image'), (req, res) => {
  if (req.file) {
    // Return path relative to server root
    res.send(`/${req.file.path.replace(/\\/g, '/')}`);
  } else {
    res.status(400).send('No file uploaded');
  }
});

module.exports = router;