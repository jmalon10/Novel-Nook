// const SearchBooks = () => {
//   return (
//     <section>
//       <h1>Thank you for coming!</h1>
//       <h1></h1>
//     </section>
//   );
// };

// export default SearchBooks;

import React, { useState } from 'react';
import axios from 'axios';

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

  // Function to handle form submission and fetch books from API
  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!searchInput) {
      return;
    }

    setLoading(true); // Start loading
    try {
      // Send a request to the backend API with the title as a query parameter
      const response = await axios.get(`/api/openlibrary/books`, {
        params: { title: searchInput },
      });

      if (response.status === 200) {
        // Set the fetched data in the state
        setSearchedBooks(response.data);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
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

      {/* Display the search results */}
      <div>
        {searchedBooks.length > 0 ? (
          searchedBooks.map((book) => (
            <div key={book.cover_id}>
              <h2>{book.title}</h2>
              <p>{book.author_name ? book.author_name.join(", ") : "Unknown Author"}</p>
              {book.cover_url && <img src={book.cover_url} alt={`${book.title} cover`} />}
              <p>Genres: {book.genres ? book.genres.join(", ") : "No genres available"}</p>
            </div>
          ))
        ) : (
          !loading && <p>No books found. Try searching for something else.</p>
        )}
      </div>
    </section>
  );
};

export default SearchBooks;