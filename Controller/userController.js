const User = require("../models/User");

// GET /me
exports.getMe = async (req, res) => {
    res.json({ user: req.user });
};

// PUT /me
exports.updateMe = async (req, res) => {
    const updates = req.body.profile || {};
    try {
        const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true });
        res.json({ user });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// DELETE /me
exports.deleteMe = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.user._id);
        res.json({ message: "User deleted" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Admin: GET all users
exports.getAllUsers = async (req, res) => {
    const users = await User.find();
    res.json({ users });
};

// Admin: DELETE user by ID
exports.deleteUserById = async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted by Admin" });
};
