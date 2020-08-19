const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const personsRouter = require('./router/personsRouter');
const persons = require('./controllers/personsController');
const errorHandler = require('./utils/errorhandler');

const app = express();
app.use(cors());
app.use(express.static('build'));

app.use(express.json());
morgan.token('body', (req, res) => {
  return JSON.stringify(req.body);
});
app.use(morgan(':method :url - :body'));
app.get('/info', persons.getInfo);
app.use('/api/persons', personsRouter);

app.use(errorHandler);

module.exports = app;
