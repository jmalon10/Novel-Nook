// src/pages/HomePage.tsx
import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { SEARCH_BOOKS } from '../queries';
import SearchBar from '../components/SearchBar';
import BookList from '../components/BookList';
import { Book } from '../models/Book';

const HomePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Apollo query to search for books
  const { data, loading, error } = useQuery(SEARCH_BOOKS, {
    variables: { searchTerm },
    skip: !searchTerm,  // Skip the query when there's no search term
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="home-page">
      <h1>Book Search</h1>
      
      {/* SearchBar Component */}
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* BookList Component */}
      {data && data.searchBooks && (
        <BookList books={data.searchBooks as Book[]} />
      )}
    </div>
  );
};

export default HomePage;
