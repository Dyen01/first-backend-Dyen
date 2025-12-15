const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Kiểm tra token
exports.protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id).select("-password");

            return next();
        } catch (err) {
            return res.status(401).json({ message: "Token không hợp lệ" });
        }
    }

    return res.status(401).json({ message: "Không tìm thấy token" });
};

// Kiểm tra quyền
exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) return res.status(401).json({ message: "Không xác định user" });

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                message: `Role '${req.user.role}' không có quyền thực hiện hành động này`
            });
        }

        next();
    };
};
