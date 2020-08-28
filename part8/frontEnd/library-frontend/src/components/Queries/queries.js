import { gql } from '@apollo/client';

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
  query {
    allBooks {
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
