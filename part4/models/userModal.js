const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name'],
  },
  username: {
    type: String,
    required: [true, 'Please enter your user_name'],
    unique: true,
    minlength: [3, 'A username must have at least 3 character'],
  },
  password: {
    type: String,
    required: [true, ' Please enter your password'],
    minlength: [3, 'A password must have at least 3 character'],
    // pwd not displayed to the user
    select: false,
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
      required: [true, 'please enter a blog'],
    },
  ],
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.checkDatabasePassword = async function (
  userInputPassword,
  DBPassword
) {
  return await bcrypt.compare(userInputPassword, DBPassword);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
