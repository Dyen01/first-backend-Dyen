require("dotenv").config();
const express = require("express");
const connectDB = require("./db");

// Routers
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();

// Middlewares
app.use(express.json());
app.use(express.static("public"));

// API routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/products", productRoutes);

// Connect Database
connectDB();

// Port
const PORT = process.env.PORT || 5000;

// Tự động thử cổng nếu bị chiếm
function startServer(port) {
    const server = app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });

    server.on("error", (err) => {
        if (err.code === "EADDRINUSE") {
            console.log(`Cổng ${port} đang được sử dụng. Thử cổng ${port + 1}...`);
            startServer(port + 1);
        } else {
            console.error(err);
        }
    });
}

// Bắt đầu server
startServer(Number(PORT));
