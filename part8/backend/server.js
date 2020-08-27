const { ApolloServer, gql } = require('apollo-server');
const { uuid } = require('uuidv4');

let authors = [
  {
    name: 'Robert Martin',
    id: 'afa51ab0-344d-11e9-a414-719c6709cf3e',
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: 'afa5b6f0-344d-11e9-a414-719c6709cf3e',
    born: 1963,
  },
  {
    name: 'Fyodor Dostoevsky',
    id: 'afa5b6f1-344d-11e9-a414-719c6709cf3e',
    born: 1821,
  },
  {
    name: 'Joshua Kerievsky', // birthyear not known
    id: 'afa5b6f2-344d-11e9-a414-719c6709cf3e',
  },
  {
    name: 'Sandi Metz', // birthyear not known
    id: 'afa5b6f3-344d-11e9-a414-719c6709cf3e',
  },
];

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: 'afa5b6f4-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring'],
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: 'afa5b6f5-344d-11e9-a414-719c6709cf3e',
    genres: ['agile', 'patterns', 'design'],
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: 'afa5de00-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring'],
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: 'afa5de01-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring', 'patterns'],
  },
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: 'afa5de02-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring', 'design'],
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: 'afa5de03-344d-11e9-a414-719c6709cf3e',
    genres: ['classic', 'crime'],
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: 'afa5de04-344d-11e9-a414-719c6709cf3e',
    genres: ['classic', 'revolution'],
  },
];

const typeDefs = gql`
  type Author {
    name: String!

    id: ID!
    born: String
    bookCount: Int!
  }
  type Book {
    title: String!
    published: Int!
    author: String!
    id: ID!
    genres: [String]!
  }

  type Query {
    authorCount: Int!
    allAuthors: [Author!]!
    findAuthor(name: String!): Author
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]!
  }
  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String]!
    ): Book

    editAuthor(name: String!, setBornTo: Int!): Author
  }
`;

const resolvers = {
  Query: {
    authorCount: () => authors.length,
    bookCount: () => books.length,
    allBooks: (root, args) => {
      if (!args.author && !args.genre) return books;
      if (args.author && args.genre) {
        return books

          .filter((el1) => el1.genres.includes(args.genre))
          .filter((el) => el.author === args.author);
      }
      if (args.author) {
        return books.filter((el) => el.author === args.author);
      }
      if (args.genre) {
        return books.filter((el) => el.genres.includes(args.genre));
      }
    },
    allAuthors: () => {
      // s make the our array like this(name of author and number of books by that author)   Bishal:2, banana:3,chicken:4
      const s = books.reduce((acc, cur) => {
        acc[cur.author] = (acc[cur.author] || 0) + 1;
        return acc;
      }, {});
      let bookfo = [];
      Object.keys(s).forEach((el) => {
        // first we find that author in the authors array and then check if it has born if it has we assign the born else it will be empty
        const authorBornyear = authors.find((el1) => el1.name == el);
        if (authorBornyear.born) {
          bookfo.push({
            name: el,
            bookCount: s[el],
            born: authorBornyear.born,
          });
        } else {
          bookfo.push({
            name: el,
            bookCount: s[el],
          });
        }
      });
      return bookfo;
    },
    findAuthor: (root, args) => authors.find((el) => el.name === args.name),
  },
  Mutation: {
    addBook: (root, args) => {
      const { author } = args;
      const authorCheck = authors.some((el) => el.name === author);
      if (!authorCheck) {
        const newAuhtor = { name: author, id: uuid(), bookCount: 1 };
        authors = [...authors, newAuhtor];
        console.log(authors);
      }
      const book = { ...args, id: uuid() };
      books = [...books, book];
      console.log(books);
      return book;
    },
    editAuthor: (root, args) => {
      const { name, setBornTo } = args;
      const user = authors.find((el) => el.name === name);
      console.log(user);
      if (!user) return null;
      const updatedUser = user;
      const updatedAuthor = [...authors];

      const index = updatedAuthor.indexOf(updatedUser);
      console.log(index);

      updatedUser.born = setBornTo;
      updatedAuthor[index] = updatedUser;
      authors = updatedAuthor;
      // console.log(updatedUser);
      console.log(authors);
      return updatedUser;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});
const port = 4870;
server.listen({ port }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
