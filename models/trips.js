
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
    passengers: [
    {
        name: {
        type: String,
        required: true
        },
        passportNumber: {
        type: String,
        required: true
        }
    }
    ],
    todos: [
    { 
        name: {
        type: Date,
        min: Date.now,
        required: true,
        },
        isComplete: {
        type: Boolean ,
        required: true,
        },
    
    }
    ],
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }],
});

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;