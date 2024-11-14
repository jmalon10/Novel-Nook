// src/App.tsx
import React, { useEffect, useState } from 'react';
import { ApolloProvider, useQuery, useMutation } from '@apollo/client';
import client from './apolloClient';
import { gql } from '@apollo/client';

// GraphQL query to get all books
const GET_BOOKS = gql`
  query {
    books {
      id
      title
      author
      genre
      description
    }
  }
`;

// GraphQL mutation to add a book to favorites
const ADD_FAVORITE_BOOK = gql`
  mutation AddFavoriteBook($userId: ID!, $bookId: ID!) {
    addFavoriteBook(userId: $userId, bookId: $bookId) {
      id
      favoriteBooks {
        id
        title
      }
    }
  }
`;

const App: React.FC = () => {
  const [userId] = useState("605c72ef1532072348289c8"); // Hardcoded userId for now
  const { data, loading, error } = useQuery(GET_BOOKS);
  const [addFavoriteBook] = useMutation(ADD_FAVORITE_BOOK);

  useEffect(() => {
    if (data) {
      console.log("Books Data:", data.books);
    }
  }, [data]);

  const handleAddToFavorites = (bookId: string) => {
    addFavoriteBook({ variables: { userId, bookId } })
      .then(response => {
        console.log("Added to favorites:", response.data.addFavoriteBook);
      })
      .catch(err => {
        console.error("Error adding to favorites:", err);
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Book List</h1>
      <ul>
        {data.books.map((book: any) => (
          <li key={book.id}>
            <h2>{book.title}</h2>
            <p>{book.author}</p>
            <button onClick={() => handleAddToFavorites(book.id)}>
              Add to Favorites
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const MainApp: React.FC = () => {
  return (
    <ApolloProvider client={client}>
     


