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
import { OpenLibraryApiResponse, OpenLibraryBookDetails } from '../../types/express/openLibrary.interface';

dotenv.config();

const router = express.Router();

// GET /api/openlibrary/books - Fetch books by title with an optional limit parameter
router.get('/books', async (req: Request, res: Response) => {
  try {
    const { title, limit } = req.query;

    if (!title) {
      return res.status(400).json({ message: "Title query parameter is required" });
    }

    const response = await fetch(
      `https://openlibrary.org/search.json?title=${title}&limit=${limit || 10}`
    );
    const data: OpenLibraryApiResponse = await response.json();

    // Map through the results and return only the essential fields
    const simplifiedData = data.docs.map(book => ({
      title: book.title,
      author_name: book.author_name,
      cover_id: book.cover_i,
    }));

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
    });
  } catch (error: any) {
    console.error("Error fetching book by ISBN:", error);
    return res.status(500).json({ message: "Failed to fetch book details by ISBN." });
  }
});

export { router as openLibraryRoutes };