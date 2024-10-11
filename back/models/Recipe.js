const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    prep_time: { type: Number },
    cost_estimate: { type: Number },
    instructions: { type: String },
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Recipe', recipeSchema);
