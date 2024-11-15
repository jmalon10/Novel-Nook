import axios from 'axios';

const BASE_URL = 'https://openlibrary.org';

/**
 * Generate the cover image URL for a book.
 * @param isbn - The ISBN of the book.
 * @param size - The size of the cover (S, M, or L).
 * @returns The URL of the cover image.
 */
const generateCoverImageUrl = (isbn: string, size: 'S' | 'M' | 'L' = 'M') => {
  return `https://covers.openlibrary.org/b/isbn/${isbn}-${size}.jpg`;
};

/**
 * Fetch books from Open Library by title and include cover URLs.
 * @param title - The title of the book.
 */
export const fetchBooksByTitle = async (title: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/search.json?title=${title}`);
    const data = response.data;

    // Map over the results to add a cover URL for each book if an ISBN is available
    const booksWithCoverUrls = data.docs.map((book: any) => {
      const isbn = book.isbn ? book.isbn[0] : null; // Use the first ISBN if available
      return {
        title: book.title,
        author_name: book.author_name,
        cover_id: book.cover_i,
        cover_url: isbn ? generateCoverImageUrl(isbn) : null, 
        genres: book.subject || []
      };
    });

    return booksWithCoverUrls;
  } catch (error) {
    console.error("Error fetching books by title:", error);
    throw new Error("Failed to fetch books by title.");
  }
};
  
/**
 * Fetch book details from Open Library by ISBN and include cover URL.
 * @param isbn - The ISBN of the book.
 */
export const fetchBookByISBN = async (isbn: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/isbn/${isbn}.json`);
    const bookDetails = response.data;

  
    return {
      title: bookDetails.title,
      authors: bookDetails.authors ? bookDetails.authors.map((author: any) => author.name) : [],
      publish_date: bookDetails.publish_date,
      number_of_pages: bookDetails.number_of_pages,
      cover_url: generateCoverImageUrl(isbn),
      genres: bookDetails.subjects || [] 
    };
  } catch (error) {
    console.error("Error fetching book by ISBN:", error);
    throw new Error("Failed to fetch book by ISBN.");
  }
};