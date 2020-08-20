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
};
exports.withoutLikeProperty = {
  author: 'matti',
  title: 'new title',
  url: 'https://bishalshah.ml/',
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
