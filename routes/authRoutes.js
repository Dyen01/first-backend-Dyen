const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Tạo token
function createToken(user) {
    return jwt.sign(
        { id: user._id, fullName: user.fullName, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
}

/* -------------------- REGISTER -------------------- */
router.post("/register", async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        const exists = await User.findOne({ email });
        if (exists) {
            return res.status(400).json({ message: "Email đã tồn tại" });
        }

        const user = await User.create({ fullName, email, password });

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

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Email không tồn tại" });
        }

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
