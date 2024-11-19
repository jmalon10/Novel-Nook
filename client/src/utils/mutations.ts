import { gql } from '@apollo/client';

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
export const ADD_USER = gql`
  mutation addUser($input: AddUserInput!) {
    addUser(input: $input) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;
export const ADD_BOOK = gql`
  mutation addBook($input: AddBookInput!) {
    addBook(input: $input) {
      _id
      books {
        _id
        title
        author
        genre
      }
    }
  }
`;
