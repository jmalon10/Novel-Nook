import React from 'react';

interface Book {
  cover_id?: number;
  title: string;
  author_name: string[];
  cover_url?: string;
  genres?: string[];
}
interface BookCardProps {
  book: Book;
  onAddToLibrary: (book: Book) => void;
}
interface BookCardProps {
  book: Book;
}
const BookCard: React.FC<BookCardProps> = ({ book, onAddToLibrary }) => {
    return (
      <div className="book-card" style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '16px', margin: '8px', maxWidth: '200px' }}>
        {book.cover_url ? (
          <img src={book.cover_url} alt={`${book.title} cover`} style={{ width: '100%', borderRadius: '4px' }} />
        ) : (
          <div style={{ width: '100%', padding: '40px 0', textAlign: 'center', backgroundColor: '#f4f4f4', borderRadius: '4px' }}>No Cover</div>
        )}
        <h3 style={{ fontSize: '1.2em', marginTop: '8px' }}>{book.title}</h3>
        <p style={{ fontSize: '0.9em', color: '#555' }}>
          Author(s): {book.author_name ? book.author_name.join(', ') : 'Unknown'}
        </p>
        {book.genres && (
          <p style={{ fontSize: '0.8em', color: '#777' }}>Genres: {book.genres.join(', ')}</p>
        )}
        <button
        onClick={() => onAddToLibrary(book)}
        style={{ marginTop: '12px', padding: '8px 12px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
      >
        Add to Library
      </button>  
      </div>
    );
  };
  
  export default BookCard;