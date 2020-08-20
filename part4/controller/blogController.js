const Blog = require('../models/blogModal');
// dont need to handle try -catch it is auto done by npm package require('express-async-errors');

exports.getAllBlogs = async (req, res) => {
  const doc = await Blog.find();
  res.status(200).json({
    status: 'success',
    data: {
      doc,
    },
  });
};
exports.createNewBlog = async (req, res) => {
  const { title, url } = req.body;
  if (!title || !url) {
    return res.status(400).json({
      status: 'error',
      data: {
        error: 'No documnet found',
      },
    });
  }
  const doc = await Blog.create(req.body);
  res.status(200).json({
    status: 'success',
    data: {
      doc,
    },
  });
};
exports.deleteSingleBlog = async (req, res) => {
  const doc = await Blog.findById(req.params.id);
  if (!doc) {
    return res.status(404).json({
      status: 'error',
      data: {
        error: 'No documnet found',
      },
    });
  }
  doc.remove();
  res.status(204).json({
    status: 'success',
  });
};
exports.getSingleBlog = async (req, res) => {
  const doc = await Blog.findById(req.params.id);
  if (!doc) {
    return res.status(404).json({
      status: 'error',
      data: {
        error: 'No documnet found',
      },
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      doc,
    },
  });
};
exports.updateSinglePost = async (req, res) => {
  const doc = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!doc) {
    return res.status(404).json({
      status: 'error',
      data: {
        error: 'No documnent found',
      },
    });
  }
  res.status(201).json({
    status: 'success',
    data: {
      doc,
    },
  });
};
