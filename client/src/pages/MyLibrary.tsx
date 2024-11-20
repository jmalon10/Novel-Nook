import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USER_BOOKS } from '../utils/queries'; // Make sure this query is defined
import { REMOVE_BOOK } from '../utils/mutations'; // Mutation to remove a book from the library

interface Book {
  cover_id: number;
  title: string;
  author: string;
  cover_url?: string;
  genre?: string;
}


const MyLibrary: React.FC = () => {
  const currentUser = localStorage.getItem('username');
  console.log("User data from local storage: ", currentUser)
  const { loading, data } = useQuery(GET_USER_BOOKS); // Fetch books from server
  const [removeBook] = useMutation(REMOVE_BOOK); // Mutation for removing a book from library
  
  const [libraryBooks, setLibraryBooks] = useState<Book[]>([]);
  const books = data || [];
  useEffect(() => {
    if (books && books.getUserBooks) {
      console.log("Books from server: ", data.getUserBooks);
      setLibraryBooks(data.getUserBooks);
    }
  }, [books]);

  // Function to remove a book from the library both locally and on the server
  const handleRemoveFromLibrary = async (cover_id: number) => {
    try {
      // Optimistically update the UI
      const updatedBooks = libraryBooks.filter(book => book.cover_id !== cover_id);
      setLibraryBooks(updatedBooks);

      // Make the mutation call to remove the book from the user's library in the database
      await removeBook({ variables: { cover_id } });

    } catch (error) {
      console.error('Error removing book from library:', error);
      // Optionally revert the local update if there's an error
    }
  };


  if (loading) return <p>Loading your library...</p>;
  return (
    <section className="py-10 px-4">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">My Library</h1>
      {libraryBooks?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {libraryBooks.map((book) => (
            <div
              key={book.cover_id}
              className="bg-white text-black rounded-lg shadow-lg p-4 transform hover:scale-105 transition duration-300 text-center"
            >
              <h2 className="text-lg font-bold mb-2">{book.title}</h2>
              <p className="text-gray-600 mb-2">
                {book.author ? book.author : "Unknown Author"}
              </p>
              {book.cover_url && (
                <img
                  src={book.cover_url}
                  alt={`${book.title} cover`}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
              )}
              <p className="text-sm text-gray-500 mb-4">
                Genre: {book.genre ? book.genre : "No genres available"}
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
        <p className="text-center text-lg text-gray-600">
          Your library is empty. Add some books from the search page!
        </p>
      )}
    </section>
  );
};

export default MyLibrary;
