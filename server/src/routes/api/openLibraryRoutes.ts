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

// GET /api/openlibrary/books - Fetch books by title
router.get('/books', async (req: Request, res: Response) => {
  try {
    const { title } = req.query;

    if (!title) {
      return res.status(400).json({ message: "Title query parameter is required" });
    }

    const response = await fetch(
      `https://openlibrary.org/search.json?title=${title}`
    );
    const data: OpenLibraryApiResponse = await response.json();

    return res.json(data.docs); // Return an array of books that match the title
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

// GET /api/openlibrary/book/:isbn - Fetch book details by ISBN
router.get('/book/:isbn', async (req: Request, res: Response) => {
  try {
    const { isbn } = req.params;

    const response = await fetch(
      `https://openlibrary.org/isbn/${isbn}.json`
    );
    const bookDetails: OpenLibraryBookDetails = await response.json();

    return res.json(bookDetails); // Return details of the book with the provided ISBN
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

export { router as openLibraryRoutes };