const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Tạo token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
};

// Register
exports.register = async (req, res) => {
    const { fullName, email, password, phone } = req.body;
    try {
        const exist = await User.findOne({ email });
        if (exist) return res.status(400).json({ message: "Email already exists" });

        const user = await User.create({ fullName, email, password, phone });
        const token = generateToken(user._id);

        res.status(201).json({ user, token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Login
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = generateToken(user._id);
        res.json({ user, token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
