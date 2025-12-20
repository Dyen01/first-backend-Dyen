const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      select: false, // ẩn password khi query
    },

    // =======================
    // PHÂN QUYỀN (Week 09)
    // =======================
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    // =======================
    // HỒ SƠ CÁ NHÂN (Week 10)
    // =======================
    profile: {
      fullName: {
        type: String,
      },
      phone: {
        type: String,
      },
    },

    // =======================
    // AVATAR (Week 12)
    // =======================
    avatarUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

// =======================
// HASH PASSWORD
// =======================
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model("User", userSchema);
