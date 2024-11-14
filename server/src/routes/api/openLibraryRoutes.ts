// /server/src/routes/api/openLibraryRoutes.ts
import express from 'express';
import { fetchBooksByTitle, fetchBookByISBN } from '../../utils/openLibraryService';