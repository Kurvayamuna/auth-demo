const mongoose = require("mongoose");

const connectDB = async () => {
 await mongoose.connect("mongodb+srv://yamunalinux12_db_user:yamuna12@cluster0.s6caphd.mongodb.net/");
 console.log("MongoDB Connected");
};

module.exports = connectDB;