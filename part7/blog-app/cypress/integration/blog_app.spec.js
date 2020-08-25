// // dont use arrow function in these cypress test (recommended by cypress)

// // each test starts from zero as far as the browser is concerned. All changes to the browser's state are reversed after each test.that is why we are doing beforeEach

// // describe('Blog Application login first ', () => {
// //   beforeEach(function () {
// //     // we are deleting the data after every test (it happens only in test mode )
// //     cy.request('POST', 'http://localhost:7000/api/tests/reset');
// //     // since the db is empty we are creating new user everytime
// //     const data = {
// //       name: 'Bishal shah',
// //       username: 'bis',
// //       password: 'asss',
// //     };
// //     cy.request('POST', 'http://localhost:7000/api/users/signup', data).then(
// //       (res) => {
// //         cy.setCookie('jwt', res.body.data.token);
// //         cy.visit('http://localhost:3000');
// //       }
// //     );
// //   });

//   // here above if u want to login instead od signup u can do
//   // it('Login user automatically', function () {
//   //   cy.visit('http://localhost:3000');

//   //   cy.contains('Log in to the application');

//   //   cy.get('#username').type('bis');
//   //   cy.get('#password').type('asss');
//   //   cy.get('#loginButton').click();
//   //   cy.contains('Bishal shah is logged in');
//   // });

//   it('Creating new Blog Post', function () {
//     cy.request('get', 'http://localhost:7000/api/users/gettoken');
//     cy.contains('Add New Blog Post').click();
//     cy.get('.author').type('Bihsal shah');
//     cy.get('.url').type('Bihsal shah');
//     cy.get('.title').type('Cypress title');
//     cy.get('#createNewBlog').click();
//     cy.contains('successfully created');
//   });
//   // passing the wrong credential
//   // itonly means only this  test will run we can use use this to check one test at a time
//   // it('wrong credential', function () {
//   //   // lets logout first after signin and then try to login with wrong credential
//   //   cy.request('GET', 'http://localhost:7000/api/users/logout');
//   //   cy.contains('Log in to the application');

//   //   cy.get('#username').type('bishal');
//   //   cy.get('#password').type('asss');
//   //   cy.get('#loginButton').click();
//   //   cy.contains('Invalid credential');
//   // });
// });

describe('when logged in', function () {
  beforeEach(function () {
    cy.login({ username: 'bis', password: 'asss' });
  });
});
describe('create new blog post', function () {
  beforeEach(function () {
    cy.createNote({ author: 'bishal', title: 'bishal', url: 'bishalshah.ml' });
  });
});
