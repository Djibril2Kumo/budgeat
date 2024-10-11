const mongoose = require('mongoose');

const shoppingListIngredientSchema = new mongoose.Schema({
    shopping_list_id: { type: mongoose.Schema.Types.ObjectId, ref: 'ShoppingList' },
    ingredient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient' },
    quantity: { type: Number }
});

module.exports = mongoose.model('ShoppingListIngredient', shoppingListIngredientSchema);
