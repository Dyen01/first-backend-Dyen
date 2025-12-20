/*
 * Middleware kiểm tra đăng nhập (JWT) và phân quyền
 */

const jwt = require('jsonwebtoken');
const User = require('../models/User');

// =======================
// 1. PROTECT – kiểm tra token
// =======================
exports.protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Lấy token
            token = req.headers.authorization.split(' ')[1];

            // Giải mã token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Lấy user từ DB (không lấy password)
            req.user = await User.findById(decoded.id).select('-password');

            next();
        } catch (error) {
            return res.status(401).json({
                message: 'Token không hợp lệ hoặc đã hết hạn'
            });
        }
    }

    if (!token) {
        return res.status(401).json({
            message: 'Không có quyền truy cập, không tìm thấy token'
        });
    }
};

// =======================
// 2. AUTHORIZE – phân quyền
// =======================
exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                message: 'Không xác định được người dùng'
            });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                message: `Vai trò '${req.user.role}' không có quyền`
            });
        }

        next();
    };
};
