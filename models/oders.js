const mongoose = require('mongoose');

// Schema cho Mặt hàng (Embedded Schema)
const orderItemSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true, min: 0 },
  _id: false
});

// Schema cho Đơn hàng
const orderSchema = new mongoose.Schema({
  user: { // Tham chiếu tới user đã tạo đơn hàng
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: { // Danh sách mặt hàng trong đơn
    type: [orderItemSchema],
    required: true
  },
  totalAmount: { type: Number, required: true, min: 0 },
  status: {
    type: String,
    enum: ['Pending', 'Delivered', 'Cancelled'],
    default: 'Pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
