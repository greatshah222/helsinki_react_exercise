const Person = require('../models/personModel');

exports.getAllPersons = async (req, res) => {
  try {
    const doc = await Person.find();
    console.log(doc);
    res.status(200).json({
      status: 'success',
      data: {
        doc,
      },
    });
  } catch (error) {
    res.status(500).json({
      data: error.response.data.message,
    });
  }
};

exports.getSinglePerson = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    const doc = await Person.findById(id);
    if (!doc) {
      return res.status(404).json({
        data: 'No Person found',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        doc,
      },
    });
  } catch (error) {
    next(error);
  }
};
exports.deleteSinglePerson = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const doc = await Person.findById(id);

    if (!doc) {
      return res.status(404).json({
        data: 'No Person found',
      });
    }
    await doc.remove();
    res.status(200).json({
      data: null,
      status: 'success',
      doc,
    });
  } catch (error) {
    res.status(500).json({
      data: error,
    });
  }
};
exports.createNewperson = async (req, res, next) => {
  try {
    const newDoc = await Person.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        doc: newDoc,
      },
    });
  } catch (error) {
    next(error);
  }
};
exports.getInfo = async (req, res, next) => {
  try {
    const doc = await Person.find();

    res.send(`<p>Phonebook has info for ${doc.length} people </p>
    <p>${new Date()}</p>`);
  } catch (error) {
    next(error);
  }
};

exports.updateSinglePerson = async (req, res, next) => {
  try {
    const { id } = req.params;
    const doc = await Person.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return res.status(400).json({
        status: 'fail',
        data: 'no person found with that id',
      });
    }

    res.status(201).json({
      status: 'success',
      data: {
        doc,
      },
    });
  } catch (error) {
    next(error);
  }
};
