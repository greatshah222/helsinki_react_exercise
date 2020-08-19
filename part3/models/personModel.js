const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name'],
    minlength: 3,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: [true, 'Please enter your phone Number'],
    minlength: 8,
  },
});

const Person = mongoose.model('Person', personSchema);
module.exports = Person;
