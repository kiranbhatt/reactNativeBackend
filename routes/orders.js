const express = require("express");
const router = express.Router();
const Order = require("../models/orders");

// GET orders for user
router.get("/:user", async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.user });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// POST create new order
router.post("/", async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ message: "Error creating order", error: err.message });
  }
});

module.exports = router;
