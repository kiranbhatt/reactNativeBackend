const express = require("express");
const bcrypt = require("bcryptjs");
const SignUpUser = require("../models/signupUsers");

const router = express.Router();

// POST /signup - register a new user
router.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const normalizedEmail = String(email || "").trim().toLowerCase();

    // check if user already exists
    const existingUser = await SignUpUser.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create new user
    const newUser = new SignUpUser({
      name,
      email: normalizedEmail,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
