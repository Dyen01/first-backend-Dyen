require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./db");

// routers
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

app.use(express.static("public"));

// API routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);

// connect DB
connectDB();

app.listen(process.env.PORT, () => {
    console.log("Server running on port", process.env.PORT);
});
