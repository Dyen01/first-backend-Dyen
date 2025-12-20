const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxlength: [100, "Product name too long"],
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price must be >= 0"],
    },
    stockQuantity: {
      type: Number,
      required: true,
      min: [0, "Stock cannot be negative"],
    },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
