const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { protect, authorize } = require('../middleware/authMiddleware');

// Tạo Đơn hàng
router.post('/', protect, async (req, res) => {
    try {
        const newOrder = await Order.create({
            user: req.user._id,
            items: req.body.items,
            totalAmount: req.body.totalAmount,
            shippingAddress: req.body.shippingAddress
        });

        res.status(201).json({
            message: "Tạo đơn hàng thành công",
            data: newOrder
        });
    } catch (err) {
        res.status(400).json({ message: "Tạo đơn thất bại", error: err.message });
    }
});

// Xem đơn hàng cá nhân
router.get('/my-orders', protect, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id })
            .populate('user', 'username email')   // Lấy thông tin user
            .populate('items.product', 'name price');

        res.status(200).json({
            message: "Lấy đơn cá nhân thành công",
            count: orders.length,
            data: orders
        });
    } catch (err) {
        res.status(500).json({ message: "Lỗi Server", error: err.message });
    }
});

// ADMIN: xem tất cả đơn hàng
router.get('/', protect, authorize('admin'), async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('user', 'username email')
            .populate('items.product', 'name price');

        res.status(200).json({
            message: "Admin xem tất cả đơn hàng thành công",
            count: orders.length,
            data: orders
        });
    } catch (err) {
        res.status(500).json({ message: "Lỗi Server", error: err.message });
    }
});

module.exports = router;
