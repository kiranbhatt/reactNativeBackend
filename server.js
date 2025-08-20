require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// Import routes
const loginRoute = require("./routes/login");
const signupRoute = require("./routes/signup");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Connect to DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected to NimbleHomeDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.use("/login", loginRoute);
app.use("/signup", signupRoute);   // 👈 add signup route here

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
