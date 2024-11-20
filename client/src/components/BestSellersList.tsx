import { useEffect, useState } from 'react';
import BookCard from './BookCard'; // Reusing the existing BookCard component
import { ADD_BOOK } from '../utils/mutations';
import { useMutation } from '@apollo/client';

interface Book {
  cover_id?: number;  // Placeholder since NYT doesn't provide this
  title: string;
  author_name: string[]; // Transformed from the "author" field
  cover_url?: string;
  genres?: string[]; // Optional, could be added manually or skipped
}

const BooksList = ({ genre, goBack }: { genre: string; goBack: () => void }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [addBook] = useMutation(ADD_BOOK, {
    context: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('id_token')}`,
      },
    },
  });

  const API_KEY = 'vbAezUGAi0Z5BncE7rf3OPxfUVpMUP9k';
  const NYT_API_URL = `https://api.nytimes.com/svc/books/v3/lists/current/${genre}.json?api-key=${API_KEY}`;

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(NYT_API_URL);
        const data = await response.json();
        if (data.status === 'OK') {
          // Transform NYT data to match the BookCard format
          const transformedBooks = data.results.books.map((book: any) => ({
            title: book.title,
            author_name: [book.author], // NYT provides a single "author" field
            cover_url: book.book_image, // Use the NYT-provided book image
            genres: [], // NYT API doesn't provide genres, could be enhanced manually
          }));
          setBooks(transformedBooks);
        } else {
          setError('Failed to fetch data');
        }
      } catch (err) {
        setError('An error occurred while fetching data');
      }
    };
    fetchBooks();
  }, [genre]);

  const handleAddToLibrary = async (book: any) => {
    try {
      await addBook({
        variables: {
          input: {
            title: book.title,
            author: book.author_name.join(', '),
            genre: book.genres ? book.genres[0] : 'Unknown',
          },
        },
      });
      alert(`${book.title} has been added to your library!`);
    } catch (error) {
      console.error('Error adding book to library:', error);
      alert('Failed to add book to library.');
    }
  };

  if (error)
    return <div className="text-center text-lg font-medium text-red-600">Error: {error}</div>;

  return (
    <div className="py-8 px-4">
      <h1 className="text-3xl font-bold text-center text-white mb-6">
        Top 10 Bestsellers in {genre.replace('-', ' ')}
      </h1>
      <button
        onClick={goBack}
        className="mx-auto mb-8 px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition duration-300 block"
      >
        Go Back
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book, index) => (
          
          <div
            key={index}
            className="bg-white text-black rounded-lg shadow-lg p-4 transform hover:scale-105 transition duration-300 text-center"
          >
            {book.cover_url ? (
              <img
                src={book.cover_url}
                alt={`${book.title} cover`}
                className="w-full h-40 object-cover rounded-t-lg mb-4"
              />
            ) : (
              <div className="w-full h-40 bg-gray-200 rounded-t-lg mb-4 flex items-center justify-center">
                <p className="text-gray-500">No Cover Available</p>
              </div>
            )}
            <h3 className="text-lg font-bold mb-2">{book.title}</h3>
            <p className="text-gray-600 mb-4">
              {book.author_name ? book.author_name.join(', ') : 'Unknown Author'}
            </p>
            <button
              onClick={() => handleAddToLibrary(book)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
            >
              Add to Library
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BooksList;
