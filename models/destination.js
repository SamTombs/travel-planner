const mongoose = require('mongoose');

const destinationSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    capital: {
        type: String,
    },
    description: {
        type: String,
    },
});

const Destination = mongoose.model('Destination', destinationSchema);

module.exports = Destination;