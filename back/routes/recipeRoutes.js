const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

// CRUD operations for recipes
router.post('/', async (req, res) => {
    const { title, description, prep_time, cost_estimate, instructions } = req.body;
    try {
        const newRecipe = new Recipe({ title, description, prep_time, cost_estimate, instructions });
        await newRecipe.save();
        res.status(201).json(newRecipe);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Additional recipe routes (get, update, delete) can be added here

module.exports = router;
