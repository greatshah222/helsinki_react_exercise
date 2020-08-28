import { gql } from '@apollo/client';

// const BOOK_DETAILS = gql`
//   fragment bookDetails on Book {
//     title
//     published
//     genres
//     id
//     author {
//       name
//       born
//       id
//     }
//   }
// `;
// export const BOOK_ADDED = gql`
//   subscription {
//     bookAdded {
//       title
//       author {
//         name
//         bookCount
//         born
//       }
//       published
//       genres
//       id
//     }
//   }
// `;

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      bookCount
      born
    }
  }
`;
export const ALL_BOOKS = gql`
  query fetchBookData($genre: String) {
    allBooks(genre: $genre) {
      title
      published
      genres
      author {
        name
        born
        id
      }
    }
  }
`;
export const ADD_NEW_BOOK = gql`
  mutation createNewBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      published
      genres
    }
  }
`;
export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      published
      genres
      id
      author {
        name
        bookCount
        born
      }
    }
  }
`;
export const UPDATE_AUTHOR_DETAILS = gql`
  mutation updateAuthor($name: String!, $setBornTo: Int!) {
    #   name is editAuthor in server
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

// fav genre

export const ME = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`;
