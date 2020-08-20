const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const blogRouter = require('./router/blogRouter');

const app = express();
app.use(cors());

app.use(express.json());

app.use(morgan('dev'));
app.use('/api/blogs', blogRouter);

module.exports = app;
