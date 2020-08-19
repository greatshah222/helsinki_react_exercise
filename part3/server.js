const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({
  path: './config.env',
});
const url = process.env.MONGODB_URI;

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

app.listen(port, () => {
  console.log(`App running on Port ${port}`);
});
