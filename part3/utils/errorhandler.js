const errorHandler = (error, req, res, next) => {
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  }
  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  }
  if (error.code === 11000) {
    return res.status(400).json({
      error: `${error.keyValue.name} already exists. Please change your value`,
    });
  }

  next(error);
};
module.exports = errorHandler;
