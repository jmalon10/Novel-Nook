// src/models/User.ts
import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
  username: string;
  email: string;
  favoriteBooks: mongoose.Types.Array<mongoose.Types.ObjectId>; // Array of Book IDs
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  favoriteBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }]
});

const User = mongoose.model<IUser>('User', UserSchema);

export default User;

