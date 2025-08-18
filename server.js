require('dotenv').config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const loginRoute = require("./routes/login");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Correct DB from .env
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected to NimbleHomeDB"))
  .catch(err => console.log(err));

app.use("/login", loginRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
