const mongoose = require('mongoose')

const optionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  votes: {
    type: Number,
    required: true
  }
})

const pollSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  options: {
    type: [optionSchema],
    required: true
  },
})

module.exports = mongoose.model('Poll', pollSchema)