import axios from 'axios';

const BASE_URL = 'https://openlibrary.org';

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