import { gql } from "@apollo/client";

// add user to db
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// log in user
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// save book to user favorites
export const SAVE_BOOK = gql`
  mutation saveBook(
    $bookId: String!
    $authors: [String]
    $description: String
    $image: String
    $link: String
    $title: String!
  ) {
    saveBook(
      bookId: $bookId
      authors: $authors
      description: $description
      image: $image
      link: $link
      title: $title
    ) {
      _id
      username
      email
      savedBooks {
        bookId
        authors
        image
        description
        title
        link
      }
    }
  }
`;

// remove from user favorites
export const DROP_BOOK = gql`
  mutation removeBook($bookId: String!) {
    removeBook(bookId: $bookId) {
      _id
      username
      email
      savedBooks {
        bookId
        authors
        image
        description
        title
        link
      }
    }
  }
`;
