const express = require("express");
const router = express.Router();
const Cart = require("../models/cart");

// GET cart for user
router.get("/:user", async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.params.user });
    res.json(cart || { items: [] });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// POST add item to cart
router.post("/", async (req, res) => {
  try {
    const { user, product } = req.body;
    let cart = await Cart.findOne({ user });

    if (!cart) {
      cart = new Cart({ user, items: [product] });
    } else {
      const index = cart.items.findIndex(i => i.productId === product.productId);
      if (index > -1) {
        cart.items[index].quantity += product.quantity;
      } else {
        cart.items.push(product);
      }
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// DELETE item from cart
router.delete("/:user/:productId", async (req, res) => {
  try {
    const { user, productId } = req.params;
    let cart = await Cart.findOne({ user });
    if (cart) {
      cart.items = cart.items.filter(i => i.productId !== productId);
      await cart.save();
    }
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
