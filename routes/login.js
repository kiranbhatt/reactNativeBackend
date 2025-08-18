const express = require('express');
const router = express.Router();
const User = require('../models/user'); // uses signupUsers collection now

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  console.log("Login attempt with:", email, password);

  try {
    const user = await User.findOne({ email: email.trim() });

    if (!user) {
      console.log("No user found with email:", email);
      return res.status(401).json({ message: "Invalid email or password" });
    }

    console.log("User found:", user);

    // Compare plain passwords (NOTE: no bcrypt yet)
    if (user.password.trim() !== password.trim()) {
      console.log("Password mismatch: DB:", user.password, "Entered:", password);
      return res.status(401).json({ message: "Invalid email or password" });
    }

    return res.status(200).json({ message: "Login successful" });

  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
