// // /server/src/routes/api/openLibraryRoutes.ts
// import express from 'express';
// import { fetchBooksByTitle, fetchBookByISBN } from '../../utils/openLibraryService.js';

// const router = express.Router();

// // Endpoint to fetch books by title
// router.get('/books', async (req, res) => {
//     const title = req.query.title as string;
//     try {
//       const data = await fetchBooksByTitle(title);
//       res.json(data);
//     } catch (error) {
//       res.status(500).json({ message: "Error fetching books by title" });
//     }
//   });

//    // Endpoint to fetch a book by ISBN
// router.get('/book/:isbn', async (req, res) => {
//     const { isbn } = req.params;
//     try {
//       const data = await fetchBookByISBN(isbn);
//       res.json(data);
//     } catch (error) {
//       res.status(500).json({ message: "Error fetching book by ISBN" });
//     }
//   });
  
//   export default router;
// /server/src/routes/api/openLibraryRoutes.ts
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import { OpenLibraryApiResponse, OpenLibraryBookDetails } from '../../types/express/openLibrary.interface';

dotenv.config();

const router = express.Router();

/**
 * Generate the cover image URL for a book.
 * @param isbn - The ISBN of the book.
 * @param size - The size of the cover (S, M, or L).
 * @returns The URL of the cover image.
 */
const generateCoverImageUrl = (isbn: string, size: 'S' | 'M' | 'L' = 'M') => {
  return `https://covers.openlibrary.org/b/isbn/${isbn}-${size}.jpg`;
};

// GET /api/openlibrary/books - Fetch books by title with an optional limit parameter
router.get('/books', async (req: Request, res: Response) => {
  try {
    const { title } = req.query;
    const limit = parseInt(req.query.limit as string, 10) || 10;

    if (!title) {
      return res.status(400).json({ success: false, message: "Title query parameter is required" });
    }

    const response = await fetch(
      `https://openlibrary.org/search.json?title=${title}&limit=${limit}`
    );
    const data: OpenLibraryApiResponse = await response.json();

  
 // Map through the results and return only the essential fields, including cover URL
    const simplifiedData = data.docs.map(book => {
      const isbn = book.isbn ? book.isbn[0] : null; // Use the first ISBN if available
      return {
        title: book.title,
        author_name: book.author_name,
        cover_id: book.cover_i,
        cover_url: isbn ? generateCoverImageUrl(isbn) : null,
        genres: book.subject ? book.subject.slice(0, 5) : []
      };
    });

    return res.json(simplifiedData);
  } catch (error: any) {
    console.error("Error fetching books by title:", error);
    return res.status(500).json({ message: "Failed to fetch books by title." });
  }
});

// GET /api/openlibrary/book/:isbn - Fetch book details by ISBN
router.get('/book/:isbn', async (req: Request, res: Response) => {
  try {
    const { isbn } = req.params;

    const response = await fetch(
      `https://openlibrary.org/isbn/${isbn}.json`
    );
    
    if (!response.ok) {
      return res.status(404).json({ message: "Book not found with the provided ISBN" });
    }

    const bookDetails: OpenLibraryBookDetails = await response.json();

    return res.json({
      title: bookDetails.title,
      authors: bookDetails.authors.map(author => author.name),
      publish_date: bookDetails.publish_date,
      number_of_pages: bookDetails.number_of_pages,
      cover_url: generateCoverImageUrl(isbn),
      genres: bookDetails.subjects ? bookDetails.subjects.slice(0, 5) : []
    });
  } catch (error: any) {
    console.error("Error fetching book by ISBN:", error);
    return res.status(500).json({ message: "Failed to fetch book details by ISBN." });
  }
});

export { router as openLibraryRoutes };