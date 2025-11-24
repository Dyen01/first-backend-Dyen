const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Hàm tạo token
function createToken(user) {
    return jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
}

/* -------------------- REGISTER -------------------- */
router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // kiểm tra trùng email
        const exists = await User.findOne({ email });
        if (exists) {
            return res.status(400).json({ message: "Email đã tồn tại" });
        }

        const user = await User.create({ username, email, password });

        const token = createToken(user);

        res.status(201).json({
            message: "Đăng ký thành công",
            token
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/* -------------------- LOGIN -------------------- */
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Lấy cả mật khẩu (vì password có select: false)
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(400).json({ message: "Email không tồn tại" });
        }

        // So sánh mật khẩu
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ message: "Mật khẩu không đúng" });
        }

        const token = createToken(user);
        res.json({ message: "Đăng nhập thành công", token });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
