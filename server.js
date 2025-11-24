const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(express.json());

mongoose
  .connect("mongodb+srv://...YOUR_ATLAS_LINK...")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use("/api/users", userRoutes);

app.listen(5000, () => {
  console.log("Server đang chạy ở cổng 5000");
});
