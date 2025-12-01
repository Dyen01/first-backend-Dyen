const Product = require("../models/Product");

// GET all products
exports.getProducts = async (req, res) => {
    const products = await Product.find();
    res.json({ products });
};

// GET product by ID
exports.getProductById = async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.json({ product });
};

// Admin: create product
exports.createProduct = async (req, res) => {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ product });
};

// Admin: update product
exports.updateProduct = async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ product });
};

// Admin: delete product
exports.deleteProduct = async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
};
