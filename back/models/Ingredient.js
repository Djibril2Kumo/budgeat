const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    category: { type: String },
    expiration_date: { type: Date }
});

module.exports = mongoose.model('Ingredient', ingredientSchema);
