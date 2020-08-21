const mongoose = require('mongoose');

const server = require('../server');

const supertest = require('supertest');

const Blog = require('../models/blogModal');
const api = supertest(server);

const {
  initialBlog,
  nonExistingId,
  notesInDB,
  newBlogPost,
  withoutLikeProperty,
  withouttitle,
} = require('./test_helper');

describe('Creating Json types', () => {
  test('exercise 4.8 blog posts are in the JSON format', async () => {
    const res = await api
      .get('/api/blogs')
      .expect('Content-Type', /application\/json/);
  });

  test('exercise 4.9 unique id to be defined', async () => {
    const res = await api.get('/api/blogs');
    const blog = res.body.data.doc[0];
    expect(blog.id).toBeDefined();
  });
});

// we have put together all the create post by using describe method of jest

describe('Creating new Blog post for testing purpose', () => {
  test('exercise 4.10  && 4.22 creating new blog post if token is not provided gets unauthorized ', async () => {
    await api.post('/api/blogs').send(newBlogPost).expect(401);

    // const res = await notesInDB();

    // const authorName = res.map((el) => el.author);
    // expect(res).toHaveLength(res.length);
    // expect(authorName).toContain('unknown');
  });

  test('exercise 4.11 creating new blog post with like to be 0 if not defined', async () => {
    const res = await api
      .post('/api/blogs')
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmM2YwOGU0MmJlNTVhMjI5YTBkMGE1MCIsImlhdCI6MTU5Nzk4NDQwMn0.0sBR0HLC3K3PllURnveHxv9ArxrrH-UGxrPYxCg7d7c'
      )
      .send(withoutLikeProperty)

      .expect(200)
      .expect('Content-Type', /application\/json/);
    // console.log(res);
    expect(res.body.data.doc.likes).toBeDefined();
    expect(res.body.data.doc.likes).toBe(0);
  });

  test(' exercise 4.12 creating new blog post without title ', async () => {
    const res = await api
      .post('/api/blogs')
      .send(withouttitle)
      // always setting of header should be after send and post
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmM2YwOGU0MmJlNTVhMjI5YTBkMGE1MCIsImlhdCI6MTU5Nzk4NDQwMn0.0sBR0HLC3K3PllURnveHxv9ArxrrH-UGxrPYxCg7d7c'
      )
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });
});
describe('Deleting and Updating Blog Post', () => {
  test('exercise 4.13 && 4.22 Blog list expansions(Deletion of blog post', async () => {
    const allBlog = await notesInDB();
    if (allBlog.length > 0) {
      const id = allBlog[0].id;
      const res = await api.delete(`/api/blogs/${id}`).expect(204);
    }
  });

  test('exercise 4.14 Blog list expansions(Updating of blog post', async () => {
    const allBlog = await notesInDB();
    const likes = 100;
    if (allBlog.length > 0) {
      const id = allBlog[0].id;
      const res = await api
        .patch(`/api/blogs/${id}`)
        .send({ likes })
        .expect(201);
      //   console.log(res.body.data.doc);
    }
  });
});
afterAll(() => {
  mongoose.connection.close();
});
