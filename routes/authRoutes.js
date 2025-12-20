const express = require('express');
const router = express.Router();
const User = require('../models/User');

const { protect, authorize } = require('../middleware/authMiddleware');

// =======================
// GET /api/v1/users/me
// User đã đăng nhập
// =======================
router.get('/me', protect, async (req, res) => {
    res.status(200).json({
        message: 'Lấy thông tin cá nhân thành công',
        data: req.user
    });
});

// =======================
// GET /api/v1/users
// Admin only
// =======================
router.get('/', protect, authorize('admin'), async (req, res) => {
    const users = await User.find();
    res.status(200).json({
        message: 'Lấy danh sách user (Admin)',
        count: users.length,
        data: users
    });
});

// =======================
// GET /api/v1/users/:id
// Admin only
// =======================
router.get('/:id', protect, authorize('admin'), async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return res.status(404).json({ message: 'Không tìm thấy user' });
    }
    res.json(user);
});

// =======================
// PUT /api/v1/users/:id
// Admin only
// =======================
router.put('/:id', protect, authorize('admin'), async (req, res) => {
    const user = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );
    res.json(user);
});

// =======================
// DELETE /api/v1/users/:id
// Admin only
// =======================
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).send();
});

module.exports = router;
