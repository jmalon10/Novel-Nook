// src/models/Book.ts
import mongoose, { Document, Schema } from 'mongoose';

interface IBook extends Document {
  title: string;
  author: string;
  genre: string;
  description: string;
}

const BookSchema = new Schema<IBook>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  description: { type: String, required: true }
});

const Book = mongoose.model<IBook>('Book', BookSchema);

export default Book;

