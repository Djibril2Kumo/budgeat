const express = require('express');
const router = express.Router();
const Ingredient = require('../models/Ingredient');

// CRUD operations for ingredients
router.post('/', async (req, res) => {
    const { name, category, expiration_date } = req.body;
    try {
        const newIngredient = new Ingredient({ name, category, expiration_date });
        await newIngredient.save();
        res.status(201).json(newIngredient);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Additional ingredient routes (get, update, delete) can be added here

module.exports = router;
