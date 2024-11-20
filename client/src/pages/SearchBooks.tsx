import React, { useState } from 'react';
import Book from '../components/BookCard';
import BookCard from '../components/BookCard';
import { useMutation } from '@apollo/client';
import { ADD_BOOK } from '../utils/mutations';



// Define the structure of each book object
interface Book {
  cover_id: number;
  title: string;
  author_name: string[];
  cover_url?: string;
  genres?: string[];
}
const SearchBooks = () => {
  const [searchInput, setSearchInput] = useState(''); // State for search input
  const [searchedBooks, setSearchedBooks] = useState<Book[]>([]); // State for search results, typed with the Book interface
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [error, setError] = useState<string | null>(null);
  const [addBook] = useMutation(ADD_BOOK);
  const handleAddToLibrary = async (book: any) => {
    console.log('Adding book to library:---------------------------------------------------', book);
    try {
      await addBook({
        variables: {
          input: {
            title: book.title,
            author: book.author_name.join(', '),
            genre: book.genres ? book.genres[0] : 'Unknown',
            cover_id: book.cover_id,
            cover_url: `https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`,
          },
        },
      });
      console.log('Adding book to library 2 :---------------------------------------------------', book);
      alert(`${book.title} has been added to your library!`);
    } catch (error) {
      console.error('Error adding book to library:', error);
      alert('Failed to add book to library.');
    }
  };
  // Function to handle form submission and fetch books from Open Library API
  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!searchInput.trim()) {
      return;
    }
    setLoading(true); // Start loading
    setError(null);
    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?title=${encodeURIComponent(searchInput.trim())}&limit=10`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch books from Open Library.");
      }
      const data = await response.json();
      // Map through the results and format them as needed
      const books = data.docs.map((book: any) => ({
        title: book.title,
        author_name: book.author_name || ["Unknown Author"],
        cover_id: book.cover_i,
        cover_url: book.isbn ? `https://covers.openlibrary.org/b/isbn/${book.isbn[0]}-M.jpg` : null,
        genres: book.subject ? book.subject.slice(0, 5) : []
      }));
      setSearchedBooks(books);
    } catch (error) {
      console.error("Error fetching books:", error);
      setError("An error occurred while fetching books. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };
  // Render the form and search results
  return (
    <section>
      <h1>Search Books</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Search by title"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {/* Show loading message */}
      {loading && <p>Loading...</p>}
      {/* Show error message */}
      {error && <p className="error-message">{error}</p>}
       {/* Display the search results using BookCard */}
       <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {searchedBooks.length > 0 && !loading ? (
          searchedBooks.map((book, index) => (
            <BookCard 
              key={book.cover_id || `${book.title}-${index}`}   
              book={book} 
              onAddToLibrary={handleAddToLibrary}
            />
          ))
        ) : (
          !loading && !error && <p>No books found. Try searching for something else.</p>
        )}
      </div>
    </section>
  );
};

export default SearchBooks;