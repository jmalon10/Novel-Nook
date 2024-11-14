// /server/src/routes/api/openLibraryRoutes.ts
import express from 'express';
import { fetchBooksByTitle, fetchBookByISBN } from '../../utils/openLibraryService';

const router = express.Router();

// Endpoint to fetch books by title
router.get('/books', async (req, res) => {
    const title = req.query.title as string;
    try {
      const data = await fetchBooksByTitle(title);
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: "Error fetching books by title" });
    }
  });