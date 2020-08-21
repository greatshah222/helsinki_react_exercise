const Blog = require('../models/blogModal');
exports.initialBlog = [
  {
    author: 'Bishal Shah',
    likes: 10,
    title: 'new title',
    url: 'https://bishalshah.ml/',
  },
  {
    author: 'Nooby ',
    likes: 10,
    title: 'new title',
    url: 'https://bishalshah.ml/',
  },
];
exports.singleUser = {
  name: 'hello',
  username: 'hello1111',
  password: 'newpassword',
};
exports.singleInvalidUser = {
  name: 'hello',
  password: 'newpassword',
};
exports.newBlogPost = {
  author: 'unknown',
  likes: 10,
  title: 'new title',
  url: 'https://bishalshah.ml/',
};
exports.withouttitle = {
  author: 'new author',
  likes: 10,
  url: 'https://bishalshah.ml/',
  testUserid: '5f3f08e42be55a229a0d0a50',
};
exports.withoutLikeProperty = {
  author: 'checking for post request by adding header ',
  title: 'new title',
  url: 'https://bishalshah.ml/',
  testUserid: '5f3f08e42be55a229a0d0a50',
};

exports.nonExistingId = async () => {
  const doc = new Blog.create({
    author: 'will remove this soon',
    likes: 10,
    title: 'heelo from the test component',

    url: 'hello.ml',
  });
  await doc.save();
  await doc.remove();
  return doc.id;
};

exports.notesInDB = async () => {
  return await Blog.find();
};
