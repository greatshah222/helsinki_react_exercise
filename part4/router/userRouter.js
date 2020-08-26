const express = require('express');

const router = express.Router();

const {
  signup,
  getAllUser,
  login,
  isLoggedIn,
  logout,
  getOneUser,
} = require('../controller/userController');

router.get('/gettoken', isLoggedIn);
router.get('/logout', logout);
router.get('/:id', getOneUser);

router.route('/').get(getAllUser);

router.route('/:id').get(getOneUser);

router.route('/signup').post(signup);
router.route('/login').post(login);

module.exports = router;
