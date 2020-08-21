const mongoose = require('mongoose');

const server = require('../server');

const supertest = require('supertest');

const api = supertest(server);

const { singleUser, singleInvalidUser } = require('./test_helper');

describe('Check for user creation process', () => {
  test('exercise 4.16 check invalid user are not created && operation returns the suitable message', async () => {
    await api.post('/api/users/signup').send(singleInvalidUser).expect(400);
  });

  test('exercise 4.16 successfull creation of user', async () => {
    await api.post('/api/users/signup').send(singleUser).expect(201);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
