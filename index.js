const express = require("express");

const app = express();
const PORT = 3000;

// Route gốc
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is running",
  });
});

// API status (bài tập tuần 02)
app.get("/api/v1/status", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Server is working fine",
  });
});

// Chạy server
app.listen(PORT, () => {
  console.log(`✅ Server đang chạy tại http://localhost:${PORT}`);
});
