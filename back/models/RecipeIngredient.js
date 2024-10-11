const mongoose = require('mongoose');

const recipeIngredientSchema = new mongoose.Schema({
    recipe_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' },
    ingredient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient' },
    quantity: { type: Number }
});

module.exports = mongoose.model('RecipeIngredient', recipeIngredientSchema);
