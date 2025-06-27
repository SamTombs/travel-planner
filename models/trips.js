
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
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    destinations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Destination',
    }],
});

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;