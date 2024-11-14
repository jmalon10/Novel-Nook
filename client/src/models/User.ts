// src/models/User.ts
import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
  username: string;
  email: string;
  favorites: mongoose.Types.Array<mongoose.Types.ObjectId>; // Array of Book IDs
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }] // Referencing Book model
});

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
