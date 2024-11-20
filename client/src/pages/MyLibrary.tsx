import React, { useState, useEffect } from 'react';

interface Book {
  cover_id: number;
  title: string;
  author_name: string[];
  cover_url?: string;
  genres?: string[];
}

const MyLibrary: React.FC = () => {
  const [libraryBooks, setLibraryBooks] = useState<Book[]>([]);

  useEffect(() => {
    // Retrieve books from local storage when the component mounts
    const savedBooks = JSON.parse(localStorage.getItem('myLibrary') || '[]');
    setLibraryBooks(savedBooks);
  }, []);

  // Function to remove a book from the library
  const handleRemoveFromLibrary = (cover_id: number) => {
    const updatedBooks = libraryBooks.filter(book => book.cover_id !== cover_id);
    setLibraryBooks(updatedBooks);
    localStorage.setItem('myLibrary', JSON.stringify(updatedBooks));
  };

  return (
    <section className="py-10 px-4">
      <h1 className="text-4xl font-bold text-center mb-6">My Library</h1>
      {libraryBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {libraryBooks.map((book) => (
            <div
              key={book.cover_id}
              className="bg-white text-black rounded-lg shadow-lg p-4 transform hover:scale-105 transition duration-300 text-center"
            >
              <h2 className="text-lg font-bold mb-2">{book.title}</h2>
              <p className="text-gray-600 mb-2">
                {book.author_name ? book.author_name.join(", ") : "Unknown Author"}
              </p>
              {book.cover_url && (
                <img
                  src={book.cover_url}
                  alt={`${book.title} cover`}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
              )}
              <p className="text-sm text-gray-500 mb-4">
                Genres: {book.genres ? book.genres.join(", ") : "No genres available"}
              </p>
              <button
                onClick={() => handleRemoveFromLibrary(book.cover_id)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
              >
                Remove from Library
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg text-white">
          Your library is empty. Add some books from the search page!
        </p>
      )}
    </section>
  );
};

export default MyLibrary;
