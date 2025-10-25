// index.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db');
const userRoutes = require('./routes/userRoutes');

// 🟢 Nạp biến môi trường (.env)
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// 🟢 Kết nối MongoDB Atlas
connectDB();

// 🧩 Middleware đọc JSON
app.use(express.json());

// 🔗 Định tuyến API
app.use('/api/v1/users', userRoutes);

// 🏠 Route kiểm tra server
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Hello from first-backend-Dyen 💕',
    server: 'OK',
  });
});

// 🚀 Khởi động server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
