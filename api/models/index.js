const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;
db.ingredient = require('./ingredient.model');

module.exports = db;
