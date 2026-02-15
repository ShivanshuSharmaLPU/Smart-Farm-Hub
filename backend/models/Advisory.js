const mongoose = require('mongoose');

const AdvisorySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    type: { type: String, enum: ['crop', 'fertilizer', 'yield', 'disease'], required: true },
    inputs: { type: Object, required: true },
    prediction: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Advisory', AdvisorySchema);
