const express = require('express');
const { deleteAllData } = require('../controller/testController');
const router = express.Router();

router.post('/reset', deleteAllData);
module.exports = router;
