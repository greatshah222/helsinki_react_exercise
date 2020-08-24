const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = require('./app');

dotenv.config({ path: './config.env' });

let url = process.env.MONGODB_URI;
if (process.env.NODE_ENV === 'test') {
  url = process.env.TEST_MONGODB_URI;
}
try {
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('db connected');
    });
} catch (error) {
  console.log(error);
}

const port = process.env.PORT || 9000;

const server = app.listen(port, async () => {
  await console.log(`App running on Port ${port}`);
});

module.exports = server;
