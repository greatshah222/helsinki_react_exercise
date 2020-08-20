const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const blogRouter = require('./router/blogRouter');
require('express-async-errors');
// for handling try catch in async function (https://github.com/davidbanham/express-async-errors)
const app = express();
app.use(cors());

app.use(express.json());

app.use(morgan('dev'));
app.use('/api/blogs', blogRouter);

module.exports = app;
