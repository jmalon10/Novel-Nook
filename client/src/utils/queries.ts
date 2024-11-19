import { gql } from '@apollo/client';
export const GET_USER_BOOKS = gql`
  query getUserBooks {
    me {
      books {
        _id
        title
        author
        genre
      }
    }
  }
`;
