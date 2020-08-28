const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'please enter your name'],
    unique: true,
    minlength: 2,
  },
  favoriteGenre: {
    type: String,
    required: [true, 'please enter your favorite genre'],
  },
});

module.exports = mongoose.model('User', schema);
