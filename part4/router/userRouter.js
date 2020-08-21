const express = require('express');

const router = express.Router();

const { signup, getAllUser, login } = require('../controller/userController');

router.route('/signup').post(signup);
router.route('/login').post(login);
router.route('/').get(getAllUser);

module.exports = router;
