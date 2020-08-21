const express = require('express');
const cors = require('cors');
require('express-async-errors');
// remember to put this error handler at top else it wont work
const morgan = require('morgan');
const blogRouter = require('./router/blogRouter');
const userRouter = require('./router/userRouter');
const errorHandler = require('./utils/errorHandler');
// for handling try catch in async function (https://github.com/davidbanham/express-async-errors)

const app = express();
app.use(cors());

app.use(express.json());

app.use(morgan('dev'));
app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);

app.use(errorHandler);

module.exports = app;
