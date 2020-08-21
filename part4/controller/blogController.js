const Blog = require('../models/blogModal');
const User = require('../models/userModal');
const { use } = require('express/lib/router');
// dont need to handle try -catch it is auto done by npm package require('express-async-errors');

exports.getAllBlogs = async (req, res) => {
  const doc = await Blog.find().populate('user');
  res.status(200).json({
    status: 'success',
    data: {
      doc,
    },
  });
};
exports.createNewBlog = async (req, res) => {
  const { title, url, author, likes } = req.body;
  console.log(req.user._id);
  const userID = req.user._id;
  if (!title || !url) {
    return res.status(400).json({
      status: 'error',
      data: {
        error: 'No documnet found',
      },
    });
  }
  const doc = await Blog.create({
    title,
    url,
    author,
    likes,
    user: userID,
  });
  const userInfo = await User.findById(userID);
  console.log(userInfo);
  if (!userInfo) {
    return res.status(400).json({
      status: 'error',
      data: {
        error: 'No user found to create a new post.',
      },
    });
  }
  await userInfo.blogs.push(doc);
  await userInfo.save({ validateBeforeSave: false });
  res.status(200).json({
    status: 'success',
    data: {
      doc,
    },
  });
};
exports.deleteSingleBlog = async (req, res) => {
  const userID = req.user._id;
  let doc = await Blog.findById(req.params.id);
  if (!doc) {
    return res.status(404).json({
      status: 'error',
      data: {
        error: 'No documnet found',
      },
    });
  }
  if (doc) {
    await doc.populate('user');
  }
  if (userID.toString() !== doc.user._id.toString()) {
    return res.status(400).json({
      status: 'error',
      data: {
        error: 'Permission denied',
      },
    });
  }

  let doc1 = await Blog.findByIdAndDelete(req.params.id).populate('user');
  await doc1.user.blogs.pull(doc1);
  await doc1.user.save({
    validateBeforeSave: false,
  });
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
