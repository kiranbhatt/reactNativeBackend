const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  specialOffer: { type: Boolean, default: false },
  discount: { type: Number, default: 0 },
});

module.exports = mongoose.model("Product", productSchema);
