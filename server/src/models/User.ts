import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

// Define an interface for the Book document
interface IBook {
  title: string;
  author: string;
  genre?: string;
}

// Define an interface for the User document
interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  books: IBook[];
  isCorrectPassword(password: string): Promise<boolean>;
}

// Define the schema for the Book document
const bookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    genre: {
      type: String,
      trim: true,
    },
  },
  {
    _id: false, // Prevent Mongoose from generating _id for sub-documents
  }
);

// Define the schema for the User document
const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must match an email address!'],
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    books: {
      type: [bookSchema], // Embed the book schema as an array
      default: [], // Default to an empty array
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

// Pre-save middleware to hash the password
userSchema.pre<IUser>('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

// Method to check if the entered password is correct
userSchema.methods.isCorrectPassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

// Create the User model
const User = model<IUser>('User', userSchema);

export default User;

