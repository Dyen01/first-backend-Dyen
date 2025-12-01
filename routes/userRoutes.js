const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middlewares/auth");
const User = require("../models/User");

// -------------------------------------------------------------------
// USER TỰ CẬP NHẬT HỒ SƠ (PUT /me)
// -------------------------------------------------------------------
router.put("/me", protect, async (req, res) => {
  try {
    const allowed = {
      profile: req.body.profile, // chỉ cho update profile
    };

    const updatedUser = await User.findByIdAndUpdate(req.user.id, allowed, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: updatedUser,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// -------------------------------------------------------------------
// ADMIN - XEM DANH SÁCH USER
// -------------------------------------------------------------------
router.get("/", protect, authorize("admin"), async (req, res) => {
  const users = await User.find();
  res.status(200).json({ success: true, count: users.length, data: users });
});

// -------------------------------------------------------------------
// ADMIN - XÓA USER
// -------------------------------------------------------------------
router.delete("/:id", protect, authorize("admin"), async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(200).json({ success: true, message: "Đã xóa user thành công" });
});

module.exports = router;
