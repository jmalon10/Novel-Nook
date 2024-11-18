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
    <section>
      <h1>My Library</h1>
      {libraryBooks.length > 0 ? (
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
              <p>{book.author_name ? book.author_name.join(", ") : "Unknown Author"}</p>
              {book.cover_url && (
                <img 
                  src={book.cover_url} 
                  alt={`${book.title} cover`} 
                  style={{ width: '100%', height: 'auto' }} 
                />
              )}
              <p>Genres: {book.genres ? book.genres.join(", ") : "No genres available"}</p>
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