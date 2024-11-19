import { useEffect, useState } from 'react';
import BookCard from './BookCard'; // Reusing the existing BookCard component

interface Book {
  cover_id?: number; // Placeholder since NYT doesn't provide this
  title: string;
  author_name: string[]; // Transformed from the "author" field
  cover_url?: string;
  genres?: string[]; // Optional, could be added manually or skipped
}

const BooksList = ({ genre, goBack }: { genre: string; goBack: () => void }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string | null>(null);

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

  const handleAddToLibrary = (book: Book) => {
    console.log(`Added "${book.title}" to the library`);
    // Logic to save the book to the user's library (e.g., API call, state management)
  };

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <button onClick={goBack}>Go Back</button>
      <h1>Top 10 Bestsellers in {genre.replace('-', ' ')}</h1>
      <div className="book-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1rem' }}>
        {books.map((book, index) => (
          <BookCard key={index} book={book} onAddToLibrary={handleAddToLibrary} />
        ))}
      </div>
    </div>
  );
};

export default BooksList;
