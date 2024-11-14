// src/components/BookList.tsx
import React from 'react';
import { Book } from '../models/Book';

interface BookListProps {
  books: Book[];
}

const BookList: React.FC<BookListProps> = ({ books }) => {
  return (
    <div className="book-list">
      {books.length > 0 ? (
        books.map((book) => (
          <div key={book.id} className="book-item">
            <h2>{book.title}</h2>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Genre:</strong> {book.genre}</p>
            <p>{book.description}</p>
          </div>
        ))
      ) : (
        <p>No books found.</p>
      )}
    </div>
  );
};

export default BookList;
