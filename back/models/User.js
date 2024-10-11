const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true }, // Hashed password
    email: { type: String, unique: true, required: true },
    dietary_preferences: { type: mongoose.Schema.Types.Mixed },
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
