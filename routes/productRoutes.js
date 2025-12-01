const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const { protect, authorize } = require("../middlewares/auth");

// GET Public
router.get("/", async (req, res) => {
  const items = await Product.find();
  res.status(200).json({ success: true, count: items.length, data: items });
});

// Admin - Create
router.post("/", protect, authorize("admin"), async (req, res) => {
  const item = await Product.create(req.body);
  res.status(201).json({ success: true, data: item });
});

// Admin - Update
router.put("/:id", protect, authorize("admin"), async (req, res) => {
  const item = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({ success: true, data: item });
});

// Admin - Delete
router.delete("/:id", protect, authorize("admin"), async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.status(200).json({ success: true, message: "Đã xóa sản phẩm" });
});

module.exports = router;
