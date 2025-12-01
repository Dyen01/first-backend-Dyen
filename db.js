const mongoose = require("mongoose");

const connectDB = async () => {
    console.log("Mongo URI:", process.env.MONGO_URI); // Thêm dòng này để debug
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
