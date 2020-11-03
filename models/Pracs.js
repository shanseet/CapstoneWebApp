const mongoose = require('mongoose');

const moveSchema = new mongoose.Schema({
    time: Date,
    move: String,
    position: [Number],
    lag: [Number],
    sync: [Number]
}, {_id : false })

const pracSchema = new mongoose.Schema({
    _id: String,
    start: Date,
    moves: [moveSchema],
})

module.exports = mongoose.model('prac', pracSchema);