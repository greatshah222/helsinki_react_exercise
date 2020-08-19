const express = require('express');
const {
  getAllPersons,
  getSinglePerson,
  deleteSinglePerson,
  createNewperson,
  updateSinglePerson,
} = require('../controllers/personsController');
const router = express.Router();
router.route('/').get(getAllPersons).post(createNewperson);
router
  .route('/:id')
  .get(getSinglePerson)
  .delete(deleteSinglePerson)
  .patch(updateSinglePerson);

module.exports = router;
