const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");


// REGISTER
router.post("/register", async (req, res) => {
 const { email, password } = req.body;

 const hashedPassword = await bcrypt.hash(password, 10);

 await User.create({
   email,
   password: hashedPassword
 });

 res.json({ message: "User registered" });
});


// LOGIN
router.post("/login", async (req, res) => {
 const { email, password } = req.body;

 const user = await User.findOne({ email });

 if (!user) return res.json({ message: "User not found" });

 const isMatch = await bcrypt.compare(password, user.password);

 if (!isMatch) return res.json({ message: "Wrong password" });

 const token = jwt.sign(
   { id: user._id },
   process.env.JWT_SECRET
 );

 res.json({ token });
});


// PROTECTED ROUTE
router.get("/dashboard", (req, res) => {
 const token = req.headers.authorization;

 if (!token) return res.json({ message: "No token" });

 try {
   const decoded = jwt.verify(token, process.env.JWT_SECRET);

   res.json({
     message: "Welcome to Dashboard",
     user: decoded
   });

 } catch {
   res.json({ message: "Invalid token" });
 }
});

module.exports = router;
