const mongoose = require('mongoose');

/// to run one file for test npm test -- tests/note_api.test.js

const app = require('../server');
const supertest = require('supertest');

const api = supertest(app);
const Blog = require('../models/blogModal');
const {
  initialBlog,
  nonExistingId,
  notesInDB,
  newBlogPost,
} = require('./test_helper');
// Since the execution of tests begins immediately after beforeEach has finished executing, the execution of tests begins before the database state is initialized.

// One way of fixing this is to wait for all of the asynchronous operations to finish executing with the Promise.all method:
beforeEach(async () => {
  await Blog.deleteMany({});
  console.log('all doc deleted');
  /**
 *    let doc = new Blog(initialBlog[0]);
    await doc.save();

    doc = new Blog(initialBlog[1]);
    
    
    await doc.save();

    Here we are creating two document in the database but we are doing it twice it can be done easily by using the following method

 */
  const doc = initialBlog.map((el) => new Blog(el));
  const promiseArray = doc.map((el) => el.save());
  await Promise.all(promiseArray);
});

test('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('there are two notes', async () => {
  const res = await api.get('/api/blogs');

  expect(res.body.data.doc).toHaveLength(initialBlog.length);
});

test('the first note is about HTTP methods', async () => {
  const res = await api.get('/api/blogs');

  expect(res.body.data.doc[0].author).toContain('Bishal Shah');
});
test('creatting new blog post', async () => {
  await api
    .post('/api/blogs')
    .send(newBlogPost)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  //   const res = await api.get('/api/blogs');
  // just using helper function
  const res = await notesInDB();
  //   console.log(res);
  //   console.log(res.body.data.doc);
  const authorName = res.map((el) => el.author);
  expect(res).toHaveLength(initialBlog.length + 1);
  expect(authorName).toContain('unknown');
});
test(' a specific note can be viewed', async () => {
  const blogTodelete = await notesInDB();
  console.log(blogTodelete);
  const result = await api
    .delete(`/api/blogs/${blogTodelete[0]._id}`)
    .expect(204);
  const blogAtEnd = await notesInDB();
  expect(blogAtEnd).toHaveLength(initialBlog.length - 1);

  const authorName = blogAtEnd.map((el) => el.author);
  expect(authorName).not.toContain(blogTodelete.authorName);
});
afterAll(() => {
  mongoose.connection.close();
});
