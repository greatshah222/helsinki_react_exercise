const mongoose = require('mongoose');

console.log(process.argv);
// [
//     '/usr/local/bin/node'= process.execPath,
//     '/Users/bishalshah/Desktop/part3_phonebook/mongo.js'= path to js file being executed,
//     'passwordofyourdatabase'= whwtever you start to pass from the command line
//   ]
if (process.argv.length < 3) {
  console.log(
    'please provide the password as an argument: node mongo.js <password>'
  );
  process.exit(1);
}
const password = process.argv[2];
const url = `mongodb+srv://bishal:${password}@cluster0.ywndv.mongodb.net/helsinkiPart3?retryWrites=true&w=majority`;

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

const personSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
});
const Person = mongoose.model('Person', personSchema);
if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    result.forEach((el) => {
      console.log(el);
    });
    mongoose.connection.close();
  });
}

if (process.argv.length === 5) {
  const newPerson = new Person({
    name: String(process.argv[3]),
    phoneNumber: String(process.argv[4]),
  });
  newPerson.save().then((result) => {
    console.log(result);
    mongoose.connection.close();
  });
}
