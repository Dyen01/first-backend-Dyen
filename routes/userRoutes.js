const express = require("express");
const router = express.Router();

const User = require("../models/User");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const cloudinary = require("../utils/cloudinary");

// ==============================
// GET PROFILE
// ==============================
router.get("/me", protect, async (req, res, next) => {
    try {
        res.json(req.user);
    } catch (error) {
        next(error);
    }
});

// ==============================
// UPLOAD AVATAR
// ==============================
router.post(
    "/upload-avatar",
    protect,
    upload.single("avatar"),
    async (req, res, next) => {
        try {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "avatars"
            });

            req.user.avatarUrl = result.secure_url;
            await req.user.save();

            res.json({
                message: "Upload avatar thành công",
                avatar: result.secure_url
            });
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
