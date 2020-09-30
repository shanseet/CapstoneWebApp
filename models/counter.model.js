const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
  _id: String,
  sequence_value: Number,
});

module.exports = mongoose.model('counter', counterSchema)