const mongoose = require("mongoose");

const uri = "mongodb+srv://duongyen:MyPass123@cluster0.bpud1hu.mongodb.net/firstBackend?retryWrites=true&w=majority";

mongoose.connect(uri)
    .then(() => console.log("MongoDB connected!"))
    .catch(err => console.error("MongoDB connection failed:", err));
