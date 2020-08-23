const express = require('express');

const router = express.Router();

const {
  signup,
  getAllUser,
  login,
  isLoggedIn,
  logout,
} = require('../controller/userController');
router.get('/gettoken', isLoggedIn);
router.get('/logout', logout);

router.route('/').get(getAllUser);

router.route('/signup').post(signup);
router.route('/login').post(login);

module.exports = router;
