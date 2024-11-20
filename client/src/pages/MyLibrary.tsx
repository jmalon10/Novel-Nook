import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USER_BOOKS } from '../utils/queries'; // Make sure this query is defined
import { REMOVE_BOOK } from '../utils/mutations'; // Mutation to remove a book from the library
import BookCard from '../components/BookCard';

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

       <h1 className="text-4xl font-bold text-center mb-6">My Library</h1>
      {libraryBooks?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {libraryBooks.map((book) => (
  <BookCard
    key={book.cover_id}
    coverId={book.cover_id}
    title={book.title}
    author={book.author}
    coverUrl={book.cover_url}
    genres={[book.genre || 'Unknown']}
    onActionClick={() => handleRemoveFromLibrary(book.cover_id)}
    actionLabel="Remove from Library"
  />
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
