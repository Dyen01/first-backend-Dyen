const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET /api/v1/products  (FILTERING + SORTING + PAGINATION)
router.get('/', async (req, res) => {
    try {
        // 1. Sao chép req.query
        let queryObj = { ...req.query };

        // 2. Loại bỏ field không dùng để filter
        const excludeFields = ['sort', 'page', 'limit'];
        excludeFields.forEach(field => delete queryObj[field]);

        // 3. Chuyển toán tử: price[gte] -> price: { $gte: 100 }
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(
            /\b(gte|gt|lte|lt)\b/g,
            (match) => `$${match}`
        );

        let query = Product.find(JSON.parse(queryStr));

        // 4. Sorting
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        }

        // 5. Pagination
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        query = query.skip(skip).limit(limit);

        // 6. Execute Query
        const products = await query;

        res.status(200).json({
            message: "Lọc sản phẩm thành công",
            count: products.length,
            data: products
        });
    } catch (err) {
        res.status(500).json({ message: "Lỗi Server", error: err.message });
    }
});

module.exports = router;
