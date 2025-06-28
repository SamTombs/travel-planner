
const mongoose = require('mongoose');

const tripSchema = mongoose.Schema({
    startDate: {
        type: Date,
        min: Date.now,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    countries: {
        type: String,
        required: true,
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }],
});

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;