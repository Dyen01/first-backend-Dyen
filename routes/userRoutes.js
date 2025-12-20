const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect, authorize } = require('../middleware/authMiddleware');

// =======================
// GET /me – xem hồ sơ cá nhân
// =======================
router.get('/me', protect, async (req, res) => {
    res.status(200).json({
        message: 'Lấy thông tin cá nhân thành công',
        data: req.user
    });
});

// =======================
// PUT /me – cập nhật hồ sơ cá nhân
// =======================
router.put('/me', protect, async (req, res) => {
    try {
        // Chỉ cho phép update profile
        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            { profile: req.body.profile },
            { new: true, runValidators: true }
        ).select('-password');

        res.status(200).json({
            message: 'Cập nhật hồ sơ thành công',
            data: updatedUser
        });
    } catch (err) {
        res.status(400).json({
            message: 'Cập nhật thất bại',
            error: err.message
        });
    }
});

// =======================
// ADMIN – xóa user
// =======================
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Đã xóa user thành công' });
});

module.exports = router;
