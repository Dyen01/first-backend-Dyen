const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    items: [
        {
            product: {
                type: mongoose.Schema.ObjectId,
                ref: "Product",
                required: true
            },
            quantity: Number,
            price: Number
        }
    ],
    totalAmount: Number,
    shippingAddress: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Order", orderSchema);
