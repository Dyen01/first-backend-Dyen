const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware kiểm tra token (Auth)
const protect = async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return res.status(401).json({ message: "Không có token, truy cập bị từ chối" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");
        next();
    } catch (err) {
        res.status(401).json({ message: "Token không hợp lệ" });
    }
};

// Middleware kiểm tra quyền Admin
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Bạn không có quyền truy cập" });
        }
        next();
    };
};

module.exports = { protect, authorize };
