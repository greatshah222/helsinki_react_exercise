const express = require('express');
require('express-async-errors');
// remember to put this error handler at top else it wont work
// parsing all the cookie from the incoming response
const morgan = require('morgan');
const blogRouter = require('./router/blogRouter');
const userRouter = require('./router/userRouter');
const errorHandler = require('./utils/errorHandler');
const cookieParser = require('cookie-parser');
// for handling try catch in async function (https://github.com/davidbanham/express-async-errors)

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(function (req, res, next) {
  // Website(domain) you wish to allow to connect
  res.setHeader(
    'Access-Control-Allow-Origin',

    'http://localhost:3000',

    'http://localhost:5000'
  );

  // Request methods you wish to allow
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );

  // Request headers you wish to allow
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,Content-Type,Accept'
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});
if (process.env.NODE_ENV == 'test') {
  const testingRouter = require('./router/testRouter');
  app.use('/api/tests', testingRouter);
}
app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);

app.use(errorHandler);

module.exports = app;
