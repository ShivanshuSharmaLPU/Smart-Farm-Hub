const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['farmer', 'admin'], default: 'farmer' },
    location: { type: String }, // e.g., City name
    soilDetails: {
        N: Number,
        P: Number,
        K: Number,
        ph: Number
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
