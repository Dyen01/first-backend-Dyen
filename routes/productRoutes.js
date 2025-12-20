const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('../utils/cloudinary');
const { protect, authorize } = require('../middleware/authMiddleware');
const Product = require('../models/Product');

const upload = multer({ dest: 'uploads/' });

// =======================
// POST /products (ADMIN)
// =======================
router.post(
    '/',
    protect,
    authorize('admin'),
    upload.single('image'),
    async (req, res, next) => {
        try {
            const uploadResult = await cloudinary.uploader.upload(req.file.path, {
                folder: 'products'
            });

            const product = await Product.create({
                ...req.body,
                imageUrl: uploadResult.secure_url
            });

            res.status(201).json(product);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
