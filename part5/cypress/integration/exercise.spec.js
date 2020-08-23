describe('Sign in user ', function () {
  beforeEach(function () {
    const data = {
      username: 'bis',
      name: 'Bishal Shah',
      password: 'asss',
    };
    cy.request('POST', 'http://localhost:7000/api/tests/reset');
    cy.request('POST', 'http://localhost:7000/api/users/signup', data);
    cy.visit('http://localhost:3000');
  });

  it('Exercise 5.17 Login form is shown automatically', function () {
    cy.request('get', 'http://localhost:7000/api/users/logout');

    cy.contains('Log in to the application');
  });

  it('exercise 5.18 login with incorrect credentials', function () {
    cy.request('get', 'http://localhost:7000/api/users/logout');
    cy.visit('http://localhost:3000');

    cy.contains('Log in to the application');

    cy.get('#username').type('bishal');
    cy.get('#password').type('asss');
    cy.get('#loginButton').click();
    cy.contains('Invalid credential');
  });

  it('exercise 5.18 login with correct  credentials', function () {
    cy.request('get', 'http://localhost:7000/api/users/logout');
    cy.visit('http://localhost:3000');

    cy.contains('Log in to the application');

    cy.get('#username').type('bis');
    cy.get('#password').type('asss');
    cy.get('#loginButton').click();
    cy.contains('Add New Blog Post');
    cy.request('get', 'http://localhost:7000/api/users/logout');
    cy.visit('http://localhost:3000');
  });
});

describe('Login Attempt', function () {
  beforeEach(function () {
    const data = {
      username: 'bis',
      password: 'asss',
    };
    cy.request('POST', 'http://localhost:7000/api/users/login', data);
    cy.visit('http://localhost:3000');
  });

  it('Creating new Blog Post', function () {
    cy.request('get', 'http://localhost:7000/api/users/gettoken');
    cy.contains('Add New Blog Post').click();
    cy.get('.author').type('Bihsal shah');
    cy.get('.url').type('Bihsal shah');
    cy.get('.title').type('Cypress title');
    cy.get('#createNewBlog').click();
    cy.contains('successfully created');
  });
  it('User can like a blog', function () {
    cy.request('get', 'http://localhost:7000/api/users/gettoken');

    cy.contains('Show Details').click();

    cy.get('#likeButton').click();

    cy.contains('liked');
  });
  it('User can delete a blog', function () {
    cy.request('get', 'http://localhost:7000/api/users/gettoken');

    cy.contains('Delete').click();

    cy.contains('Deleted');
  });
  it.only('Arrange blogs according to the like', function () {
    cy.request('get', 'http://localhost:7000/api/users/gettoken');
    // adding 1st post
    cy.contains('Add New Blog Post').click();
    cy.get('.author').type('Bihsal shah');
    cy.get('.url').type('Bihsal shah');
    cy.get('.title').type('Cypress title');
    cy.get('#createNewBlog').click();
    cy.contains('successfully created');
    // liking it
    cy.contains('Show Details').click();

    cy.get('#likeButton').click();

    cy.contains('liked');
    // creaating second post
    cy.contains('Add New Blog Post').click();
    cy.get('.author').type('Bihsal shah');
    cy.get('.url').type('Bihsal shah');
    cy.get('.title').type('Cypress title');
    cy.get('#createNewBlog').click();
    cy.contains('successfully created');
    cy.contains('Show Details').click();
    // not liking it just checking the like

    let descending = true;
    cy.get('#likes').then((likes) => {
      for (let i = 1; i < likes.length; i++) {
        if (Number(likes[i].innerHTML) > Number(likes[i - 1].innerHTML)) {
          descending = false;
        }
      }
    });

    expect(descending).to.equal(true);
  });
});
