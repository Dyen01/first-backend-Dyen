require("dotenv").config();
const express = require("express");
const connectDB = require("./db");

// Routers
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

// Middleware lỗi
const errorHandler = require("./middleware/errorMiddleware");

// ✅ PHẢI TẠO APP TRƯỚC
const app = express();

// Middlewares
app.use(express.json());
app.use(express.static("public"));

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/orders", orderRoutes);

// Error handler – LUÔN LUÔN CUỐI
app.use(errorHandler);

// Connect DB
connectDB();

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
