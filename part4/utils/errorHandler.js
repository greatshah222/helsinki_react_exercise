const errorHandler = (error, req, res, next) => {
  // console.log(error);

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  }
  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  }
  if (error.code === 11000) {
    // console.log(error.keyValue);
    return res.status(400).json({
      error: `${error.keyValue.name} already exists. Please change your value`,
    });
  }
  if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: 'Invalid Token. Please login to continue',
    });
  }
  if (error.name === 'TokenExpiredError') {
    return res.status(401).json({
      error: 'Token Expired. Please login again to continue',
    });
  }

  next(error);
};
module.exports = errorHandler;
