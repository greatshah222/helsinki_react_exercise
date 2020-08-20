const express = require('express');
const router = express.Router();
const {
  getAllBlogs,
  createNewBlog,
} = require('../controller/blogController.js');

router.route('/').get(getAllBlogs).post(createNewBlog);

module.exports = router;
