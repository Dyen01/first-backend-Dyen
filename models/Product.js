const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  price: Number,
  description: String,
});

module.exports = mongoose.model("Product", ProductSchema);
