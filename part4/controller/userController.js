const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const User = require('../models/userModal');
const { use } = require('express/lib/router');

exports.signup = async (req, res) => {
  const { username, name, password } = req.body;
  const doc = await User.create({
    username,
    name,
    password,
    blogs: [],
  });
  const token = jwt.sign({ id: doc._id }, process.env.JWT_SECRET);
  doc.password = undefined;
  res.status(201).json({
    status: 'succes',
    token,
    data: {
      doc,
    },
  });
};
exports.login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      error: 'Please provide your credential ',
    });
  }
  const user = await User.findOne({ username }).select('+password');
  if (!user || !(await user.checkDatabasePassword(password, user.password))) {
    return res.status(400).json({
      error: 'Invalid credential ',
    });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  user.password = undefined;
  res.status(201).json({
    status: 'succes',
    token,
    data: {
      doc: user,
    },
  });
};
exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // we wanted to use token here but cant assign it here cause let and const are block scope
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    res.status(401).json({
      status: 'error',
      error: 'please log in to have access',
    });
  }
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const currentUser = await User.findById(decoded.id);
  //   console.log(currentUser);
  if (!currentUser) {
    res.status(401).json({
      status: 'error',
      error: 'the user no longer exists',
    });
  }
  req.user = currentUser;
  console.log(req.user._id);
  next();
};
exports.getAllUser = async (req, res) => {
  const doc = await User.find().populate('blogs');
  res.status(201).json({
    status: 'succes',

    data: {
      doc,
    },
  });
};
