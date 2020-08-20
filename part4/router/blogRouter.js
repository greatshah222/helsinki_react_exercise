const express = require('express');
const router = express.Router();
const {
  getAllBlogs,
  createNewBlog,
  getSingleBlog,
  deleteSingleBlog,
  updateSinglePost,
} = require('../controller/blogController.js');

router.route('/').get(getAllBlogs).post(createNewBlog);
router
  .route('/:id')
  .get(getSingleBlog)
  .delete(deleteSingleBlog)
  .patch(updateSinglePost);

module.exports = router;
