require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/products");

const products = [
  {
    name: "Tomato",
    category: "Vegetable",
    subcategory: "Green",
    price: 50,
    image: "tomato.jpg",
    specialOffer: true,
    discount: 10,
  },
  {
    name: "Potato",
    category: "Vegetable",
    subcategory: "Root",
    price: 40,
    image: "potato.jpg",
    specialOffer: false,
    discount: 0,
  },
  {
    name: "Onion",
    category: "Vegetable",
    subcategory: "Root",
    price: 60,
    image: "onion.jpg",
    specialOffer: true,
    discount: 5,
  },
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected");
    await Product.deleteMany({}); // clear existing
    await Product.insertMany(products);
    console.log("Products seeded");
    process.exit(0);
  })
  .catch(err => {
    console.error("Error:", err);
    process.exit(1);
  });
