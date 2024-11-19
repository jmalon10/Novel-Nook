import React, { useState } from 'react';
import BookCard from '../components/BookCard';

interface Book {
  cover_id: number;
  title: string;
  author_name: string[];
  cover_url?: string;
  genres?: string[];
}

const SearchBooks = () => {
  const [searchInput, setSearchInput] = useState(''); // State for search input
  const [searchedBooks, setSearchedBooks] = useState<Book[]>([]); // State for search results
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [error, setError] = useState<string | null>(null);

  const handleAddToLibrary = (book: Book) => {
    const savedBooks: Book[] = JSON.parse(localStorage.getItem('myLibrary') || '[]');
    if (!savedBooks.some(savedBook => savedBook.cover_id === book.cover_id)) {
      savedBooks.push(book);
      localStorage.setItem('myLibrary', JSON.stringify(savedBooks));
      alert(`${book.title} has been added to your library!`);
    } else {
      alert(`${book.title} is already in your library.`);
    }
  };

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
        throw new Error('Failed to fetch books from Open Library.');
      }
      const data = await response.json();
      const books = data.docs.map((book: any) => ({
        title: book.title,
        author_name: book.author_name || ['Unknown Author'],
        cover_id: book.cover_i,
        cover_url: book.isbn ? `https://covers.openlibrary.org/b/isbn/${book.isbn[0]}-M.jpg` : null,
        genres: book.subject ? book.subject.slice(0, 5) : [],
      }));
      setSearchedBooks(books);
    } catch (error) {
      console.error('Error fetching books:', error);
      setError('An error occurred while fetching books. Please try again.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <section className="min-h-screen bg-gray-100 py-10 px-4">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Search Books 🔍</h1>
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

      {loading && (
        <p className="text-center text-lg font-medium text-gray-600">Loading...</p>
      )}

      {error && (
        <p className="text-center text-lg font-medium text-red-600">{error}</p>
      )}

      <div className="flex flex-wrap justify-center gap-6">
        {searchedBooks.length > 0 && !loading ? (
          searchedBooks.map((book) => (
            <BookCard
              key={book.cover_id}
              book={book}
              onAddToLibrary={handleAddToLibrary}
            />
          ))
        ) : (
          !loading &&
          !error && (
            <p className="text-center text-lg font-medium text-gray-600">
              No books found ☹️. Try searching for something else.
            </p>
          )
        )}
      </div>
    </section>
  );
};

export default SearchBooks;
