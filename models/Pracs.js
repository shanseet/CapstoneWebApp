const mongoose = require('mongoose');

const moveSchema = new mongoose.Schema({
    time: Date,
    move: String,
    position: [Number],
    lag: [Number],
    sync: Number,
}, {_id : false })

const pracSchema = new mongoose.Schema({
    start: Date,
    moves: [moveSchema],
    notes: String
})

module.exports = mongoose.model('prac', pracSchema);