const express = require("express");
const router = express.Router();
const ShoppingList = require("../models/ShoppingList");
const ShoppingListIngredient = require("../models/ShoppingListIngredient");

// CRUD operations for shopping lists

// Create a new shopping list
router.post("/", async (req, res) => {
  const { user_id } = req.body;
  try {
    const newShoppingList = new ShoppingList({ user_id });
    await newShoppingList.save();
    res.status(201).json(newShoppingList);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
