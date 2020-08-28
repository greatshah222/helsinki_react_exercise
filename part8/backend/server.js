const {
  ApolloServer,
  gql,
  UserInputError,
  AuthenticationError,
} = require('apollo-server');

const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const Author = require('./models/authorModel');
const Book = require('./models/bookModal');
const User = require('./models/userModal');
const jwt = require('jsonwebtoken');

const url = process.env.TEST_MONGODB_URI;

try {
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('db connected 🟥');
    });
} catch (error) {
  console.log(error);
}

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
    author: Author!
    id: ID!
    genres: [String]!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }

  type Query {
    authorCount: Int!
    allAuthors: [Author!]!
    findAuthor(name: String!): Author
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    me: User
  }
  type Mutation {
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
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
    authorCount: () => Author.collection.countDocuments(),
    bookCount: () => Book.collection.countDocuments(),
    // auto handling of async function by apollo
    allBooks: async (root, args) => {
      if (!args.author && !args.genre) {
        const books = await Book.find().populate('author');
        console.log(books);
        return books;
      }

      if (args.author && args.genre) {
        // first finding the author
        const author = await Author.findOne({ name: args.author });

        // there is also a condition of OR(operator). it gives the result matching any condition either author is in author.id or genres is in args.genre.Remember this is for just practise
        const orOperatorBook = await Book.find({
          $or: [
            { author: { $in: author.id } },
            { genres: { $in: args.genre } },
          ],
        });

        // now finding the book where author is author.id and($and operator) genres in args.genre.We have to search by user id cause in the books model we are just saving the Author id
        const books = await Book.find({
          $and: [
            { author: { $in: author.id } },
            { genres: { $in: args.genre } },
          ],
        }).populate('author');
        return books;

        // .filter((el1) => el1.genres.includes(args.genre))
        // .filter((el) => el.author === args.author);
      }
      if (args.author) {
        // return books.filter((el) => el.author === args.author);
        const author = await Author.findOne({ name: args.author });
        // finding books by author(which is in author.id)
        const books = await Book.find({ author: { $in: author.id } }).populate(
          'author'
        );
        return books;
      }
      if (args.genre) {
        const books = await Book.find({ genres: { $in: args.genre } }).populate(
          'author'
        );
        return books;
        // return books.filter((el) => el.genres.includes(args.genre));
      }
    },
    allAuthors: async () => {
      // s make the our array like this(name of author and number of books by that author)   Bishal:2, banana:3,chicken:4
      // const s = books.reduce((acc, cur) => {
      //   acc[cur.author] = (acc[cur.author] || 0) + 1;
      //   return acc;
      // }, {});
      // let bookfo = [];
      // Object.keys(s).forEach((el) => {
      //   // first we find that author in the authors array and then check if it has born if it has we assign the born else it will be empty
      //   const authorBornyear = authors.find((el1) => el1.name == el);
      //   if (authorBornyear.born) {
      //     bookfo.push({
      //       name: el,
      //       bookCount: s[el],
      //       born: authorBornyear.born,
      //     });
      //   } else {
      //     bookfo.push({
      //       name: el,
      //       bookCount: s[el],
      //     });
      //   }
      // });
      // return bookfo;

      /**
       *
       * The above code is before using the Mongodb
       */

      // the goal is to find how many books have been published by that author along with their date of birth

      const books = await Book.find().populate('author');
      const s = books.reduce((acc, cur) => {
        acc[cur.author.name] = (acc[cur.author.name] || 0) + 1;
        return acc;
      }, {});

      let bookByAuthor = Object.keys(s).map(async (el) => {
        // we are first finding the author and then check for their born year
        const author = await Author.find({ name: el });

        if (author[0].born) {
          const bookInfo = {
            name: author[0].name,
            born: author[0].born,
            bookCount: s[el],
          };
          return bookInfo;
        }
        if (!author[0].born) {
          const bookInfo = {
            name: author[0].name,
            bookCount: s[el],
          };
          return bookInfo;
        }
      });
      // bookByAuthor is an array full of promise so we have to use Promise.all
      bookByAuthor = await Promise.all(bookByAuthor);
      return bookByAuthor;
    },
    findAuthor: async (root, args) => await Author.findOne({ name: args.name }),
    // for favgenre
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      let book;
      try {
        let author = await Author.findOne({ name: args.author });
        if (author) {
          book = await Book.create({ ...args, author: author._id });
        }
        // if there is no author we will create a new one
        if (!author) {
          author = await Author.create({
            name: args.author,
            born: null,
            bookCount: 1,
          });
          book = await Book.create({
            ...args,
            author: author._id,
          });
        }
        book = await book.populate('author');
        console.log(book);

        return book;
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
    },
    editAuthor: async (root, args, { currentUser }) => {
      // const { name, setBornTo } = args;
      // const user = authors.find((el) => el.name === name);
      // console.log(user);
      // if (!user) return null;
      // const updatedUser = user;
      // const updatedAuthor = [...authors];

      // const index = updatedAuthor.indexOf(updatedUser);
      // console.log(index);

      // updatedUser.born = setBornTo;
      // updatedAuthor[index] = updatedUser;
      // authors = updatedAuthor;
      // // console.log(updatedUser);
      // console.log(authors);
      // return updatedUser;
      const author = await Author.findOne({ name: args.name });
      if (!currentUser) {
        throw new AuthenticationError('Please login ');
      }
      let updatedUser;
      if (author) {
        updatedUser = await Author.findByIdAndUpdate(author._id, {
          born: args.setBornTo,
        });
      }
      return updatedUser;
    },
    createUser: async (root, args) => {
      let user;
      try {
        user = await User.create({ ...args });
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      return user;
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      if (!user || args.password !== 'asdf') {
        throw new UserInputError('Invalid credential');
      }
      const token = {
        username: user.username,
        id: user._id,
      };
      console.log(token);
      return { value: jwt.sign(token, 'thisissecret') };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), 'thisissecret');
      const currentUser = await User.findById(decodedToken.id).populate(
        'friends'
      );
      return { currentUser };
    }
  },
});
const port = 4870;
server.listen({ port }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
