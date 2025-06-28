const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    name: {
        type: Date,
        min: Date.now,
        required: true,
    },
    isComplete: {
        type: Boolean ,
        required: true,
    },
});
const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;