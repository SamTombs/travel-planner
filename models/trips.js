
const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
        name: {
        type: String,
        required: true,
        },
        isComplete: {
        type: Boolean ,
        required: true,
        },
})
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
    passengers:  {
        type: String,
        required: true,
    },
    
    todos: [todoSchema],

    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }],
});

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;