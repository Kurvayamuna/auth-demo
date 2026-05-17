const express = require("express");
const mongoose = require("mongoose");
const app = express();

require("dotenv").config();

const cors = require("cors");
app.use(cors({
 origin: "https://lustrous-bublanina-ad0d43.netlify.app/"
}));


const connectDB = require("./confiq/db");
const authRoutes = require("./routes/authRoutes");

app.use(express.json());

// connectDB();
mongoose.connect(process.env.MONGO_URL)
 .then(() => console.log("DB Connected"));


app.use("/", authRoutes);

app.listen(5000, () => {
 console.log("Server running on port 3000");
});
