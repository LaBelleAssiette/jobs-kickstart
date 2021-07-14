const mongoose = require('mongoose');

const Ingredient = mongoose.model(
    'Ingredient',
    new mongoose.Schema({
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 0,
      },
      emoji: {
        type: String,
      },
      date: {
        type: Date,
      },
    }, {timestamps: true}),
);

module.exports = Ingredient;
