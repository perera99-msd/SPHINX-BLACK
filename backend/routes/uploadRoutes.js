// routes/uploadRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const path = require('path');

// 1. Config Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 2. Setup Storage Engine
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'sphynx-uploads', // The folder name in Cloudinary
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
  },
});

const upload = multer({ storage });

// 3. Upload Route
router.post('/', upload.single('image'), (req, res) => {
  // Cloudinary returns the path in req.file.path
  res.send(req.file.path);
});

module.exports = router;