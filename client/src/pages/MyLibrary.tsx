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
    <section>
      <h1>My Library</h1>
      {libraryBooks?.length > 0 ? (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {libraryBooks.map((book) => (
            <div 
              key={book.cover_id} 
              style={{ 
                border: '1px solid #ddd', 
                padding: '10px', 
                margin: '10px', 
                width: '200px' 
              }}
            >
              <h2>{book.title}</h2>
              <p>{book.author ? book.author : "Unknown Author"}</p>
              {book.cover_url && (
                <img 
                  src={book.cover_url} 
                  alt={`${book.title} cover`} 
                  style={{ width: '100%', height: 'auto' }} 
                />
              )}
              <p>Genre: {book.genre ? book.genre : "No genres available"}</p>
              <button 
                onClick={() => handleRemoveFromLibrary(book.cover_id)}
                style={{
                    padding: '8px 16px', backgroundColor: '#ff4d4d', color: '#fff', border: 'none',
                    borderRadius: '4px', cursor: 'pointer', fontSize: '0.9em', marginTop: '10px'
                  }}>
                Remove from Library
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>Your library is empty. Add some books from the search page!</p>
      )}
    </section>
  );
};

export default MyLibrary;
