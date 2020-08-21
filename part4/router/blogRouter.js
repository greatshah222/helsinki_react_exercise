const express = require('express');
const router = express.Router();
const {
  getAllBlogs,
  createNewBlog,
  getSingleBlog,
  deleteSingleBlog,
  updateSinglePost,
} = require('../controller/blogController.js');
const { protect } = require('../controller/userController');

router.route('/').get(getAllBlogs).post(protect, createNewBlog);
router
  .route('/:id')
  .get(getSingleBlog)
  .delete(protect, deleteSingleBlog)
  .patch(updateSinglePost);

module.exports = router;
