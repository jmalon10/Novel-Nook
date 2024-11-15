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
 * Fetch books from Open Library by title.
 * @param title - The title of the book.
 */
export const fetchBooksByTitle = async (title: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/search.json?title=${title}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching books by title:", error);
      throw new Error("Failed to fetch books by title.");
    }
  };
  
  /**
 * Fetch book details from Open Library by ISBN.
 * @param isbn - The ISBN of the book.
 */
export const fetchBookByISBN = async (isbn: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/isbn/${isbn}.json`);
      return response.data;
    } catch (error) {
      console.error("Error fetching book by ISBN:", error);
      throw new Error("Failed to fetch book by ISBN.");
    }
  };