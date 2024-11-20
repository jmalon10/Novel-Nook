import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USER_BOOKS } from '../utils/queries';
import { REMOVE_BOOK } from '../utils/mutations';
import BookCard from '../components/BookCard'; // Import the reusable BookCard component

interface Book {
  cover_id: number;
  title: string;
  author: string;
  cover_url?: string;
  genre?: string;
}

const MyLibrary: React.FC = () => {
  const { loading, data } = useQuery(GET_USER_BOOKS);
  const [removeBook] = useMutation(REMOVE_BOOK);

  const [libraryBooks, setLibraryBooks] = useState<Book[]>([]);

  useEffect(() => {
    if (data?.getUserBooks) {
      setLibraryBooks(data.getUserBooks);
    }
  }, [data]);

  const handleRemoveFromLibrary = async (cover_id: number) => {
    try {
      const updatedBooks = libraryBooks.filter((book) => book.cover_id !== cover_id);
      setLibraryBooks(updatedBooks);
      await removeBook({ variables: { cover_id } });
    } catch (error) {
      console.error('Error removing book from library:', error);
    }
  };

  if (loading) return <p>Loading your library...</p>;

  return (
    <section className="py-10 px-4">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">My Library</h1>
      {libraryBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {libraryBooks.map((book) => (
            <BookCard
              key={book.cover_id}
              cover_id={book.cover_id}
              title={book.title}
              author={book.author}
              cover_url={book.cover_url}
              genre={book.genre}
              onAction={() => handleRemoveFromLibrary(book.cover_id)}
              actionLabel="Remove from Library"
            />
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

