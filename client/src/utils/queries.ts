import { gql } from '@apollo/client';
export const GET_USER_BOOKS = gql`
  query getUserBooks {
    getUserBooks {
      author
      genre
      title
    }
  }
`;
