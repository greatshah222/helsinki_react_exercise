const Blog = require('../models/blogModal');

exports.getAllBlogs = async (req, res, next) => {
  try {
    const doc = await Blog.find();
    res.status(200).json({
      status: 'success',
      data: {
        doc,
      },
    });
  } catch (error) {
    res.status(200).json({
      status: 'error',
      data: {
        error,
      },
    });
  }
};
exports.createNewBlog = async (req, res, next) => {
  try {
    const doc = await Blog.create(req.body);
    res.status(200).json({
      status: 'success',
      data: {
        doc,
      },
    });
  } catch (error) {
    res.status(200).json({
      status: 'error',
      data: {
        error,
      },
    });
  }
};
