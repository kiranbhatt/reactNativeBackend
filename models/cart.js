const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  user: { type: String, required: true }, // store user email or ID
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      name: String,
      price: Number,
      quantity: { type: Number, default: 1 },
    },
  ],
});

module.exports = mongoose.model("Cart", cartSchema);
