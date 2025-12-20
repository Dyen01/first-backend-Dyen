const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { protect, authorize } = require('../middleware/authMiddleware');

// =======================
// PUBLIC – xem sản phẩm
// =======================
router.get('/', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

// =======================
// ADMIN – tạo sản phẩm
// =======================
router.post('/', protect, authorize('admin'), async (req, res) => {
    const product = await Product.create(req.body);
    res.status(201).json(product);
});

// =======================
// ADMIN – cập nhật sản phẩm
// =======================
router.put('/:id', protect, authorize('admin'), async (req, res) => {
    const product = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );
    res.json(product);
});

// =======================
// ADMIN – xóa sản phẩm
// =======================
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Đã xóa sản phẩm' });
});

module.exports = router;
