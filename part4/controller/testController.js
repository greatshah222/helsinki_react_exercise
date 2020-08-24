const User = require('../models/userModal');
const Blog = require('../models/blogModal');

exports.deleteAllData = async (req, res) => {
  await User.deleteMany({});
  await Blog.deleteMany({});
  res.status(204).json({
    status: 'success',
  });
};
