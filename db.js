const mongoose = require('mongoose');
require('dotenv').config(); // Đọc file .env

const connectDB = async () => {
  try {
    // Kết nối đến MongoDB bằng URI trong file .env
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected successfully! Ready for use.');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1); // Thoát app nếu không kết nối được DB
  }
};

module.exports = connectDB;
