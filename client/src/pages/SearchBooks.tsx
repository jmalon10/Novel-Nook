import React, { useState } from 'react';
import Book from '../components/BookCard';
import { useMutation } from '@apollo/client';
import { ADD_BOOK } from '../utils/mutations';
import { GET_USER_BOOKS } from '../utils/queries';
import BookCard from '../components/BookCard';


// Define the structure of each book object

interface Book {
  cover_id: number;
  title: string;
  author_name: string[];
  cover_url?: string;
  genres?: string[];
}

export interface UserBooksQuery {
  getUserBooks: Book[];
}

const SearchBooks = () => {
  const [searchInput, setSearchInput] = useState(''); // State for search input
  const [searchedBooks, setSearchedBooks] = useState<Book[]>([]); // State for search results, typed with the Book interface
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [error, setError] = useState<string | null>(null);
  const [addBook] = useMutation(ADD_BOOK);
  const handleAddToLibrary = async (book: any) => {
      try {
        const coverUrl = book.cover_id 
        ? `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg` 
        : null;
  
      await addBook({
        variables: {
          input: {
            title: book.title,
            author: book.author_name.join(', '),
            genre: book.genres ? book.genres[0] : 'Unknown',
            cover_id: book.cover_id,
            cover_url: coverUrl,
          },
        },
        update: (cache, { data: { addBook } }) => {
          const existingBooks = cache.readQuery<UserBooksQuery>({ query: GET_USER_BOOKS });
          cache.writeQuery({
            query: GET_USER_BOOKS,
            data: {
              getUserBooks: [...(existingBooks?.getUserBooks || []), addBook],
            },
          });
        },
      });
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
    setLoading(true);  // Start loading
    setError(null);

    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?title=${encodeURIComponent(searchInput.trim())}&limit=10`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch books from Open Library.');
      }
      const data = await response.json(); // Map through the results and format them as needed
      const books = data.docs.map((book: any) => ({
        title: book.title,
        author_name: book.author_name || ['Unknown Author'],
        cover_id: book.cover_i,
        cover_url: book.cover_i 
          ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
          : book.isbn 
            ? `https://covers.openlibrary.org/b/isbn/${book.isbn[0]}-M.jpg` 
            : null,
        genres: book.subject ? book.subject.slice(0, 5) : [],
      }));
      setSearchedBooks(books);
    } catch (error) {
      console.error('Error fetching books:', error);
      setError('An error occurred while fetching books. Please try again.');
    } finally {
      setLoading(false);  // Stop loading
    }
  };
  // Render the form and search results
  return (
    
    <section className="py-10 px-4">

      <h4 className="text-4xl font-bold text-center mb-6">Search Books</h4>
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col items-center gap-4 mb-8 max-w-md mx-auto"
      >
        <input
          type="text"
          placeholder="Search by title"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-200"
        >
          Search
        </button>
      </form>
  {/* Show loading message */}
      {loading && (
        <p className="text-center text-lg font-medium text-gray-600">Loading...</p>
      )}

      {error && (
        <p className="text-center text-lg font-medium text-red-600">{error}</p>
         /* Show error message */
      )}
  {/* Display the search results using BookCard */}
      {searchedBooks.length > 0 && !loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
{searchedBooks.map((book) => (
  <BookCard
    key={book.cover_id}
    coverId={book.cover_id}
    title={book.title}
    author={book.author_name.join(', ')}
    coverUrl={book.cover_url}
    genres={book.genres}
    onActionClick={() => handleAddToLibrary(book)}
    actionLabel="Add to Library"
  />
))}

        </div>
      ) : (
        !loading &&
        !error && (
          <div className="flex items-center justify-center h-60">
            <p className="text-center text-lg font-medium text-white">
              No books found ☹️ Try searching for something else.
            </p>
          </div>
        )
      )}
    </section>
  );
};

export default SearchBooks;

