const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('../utils/cloudinary');
const { protect } = require('../middleware/authMiddleware');
const User = require('../models/User');

const upload = multer({ dest: 'uploads/' });

// =======================
// POST /upload-avatar
// =======================
router.post(
    '/upload-avatar',
    protect,
    upload.single('avatar'),
    async (req, res, next) => {
        try {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'avatars'
            });

            const user = await User.findByIdAndUpdate(
                req.user._id,
                { avatarUrl: result.secure_url },
                { new: true }
            );

            res.status(200).json({
                message: 'Upload avatar thành công',
                avatarUrl: result.secure_url
            });
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
