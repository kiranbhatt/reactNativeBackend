const mongoose = require("mongoose");

// Define schema for signup users
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // email should be unique
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
}, { timestamps: true });

// Create model
const SignUpUser = mongoose.model("signUpUsers", userSchema);

module.exports = SignUpUser;
