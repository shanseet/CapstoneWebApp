const mongoose = require('mongoose');

const moveSchema = new mongoose.Schema({
    time: Date,
    move: Number,
    position: [Number],
    lag: [{
        d_id: Number,
        lag: Number
    }]
}, {_id : false })

const pracSchema = new mongoose.Schema({
    _id: String,
    start: Date,
    dancers: [Number],
    moves: [moveSchema],
})

module.exports = mongoose.model('prac', pracSchema);