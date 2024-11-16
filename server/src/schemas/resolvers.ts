import { User, Book } from '../models/index.js';
import { signToken, AuthenticationError } from '../utils/auth.js'; 

// Define types for the arguments
interface AddUserArgs {
  input:{
    username: string;
    email: string;
    password: string;
  }
}

interface LoginUserArgs {
  email: string;
  password: string;
}

interface UserArgs {
  username: string;
}

interface AddBookArgs {
  title: string;
  author: string;
  genre: string;
}

interface GetBooksArgs {
  title?: string;
  author?: string;
  genre?: string;
}

const resolvers = {
  Query: {
    users: async () => {
      return User.find()
    },
    user: async (_parent: any, { username }: UserArgs) => {
      return User.findOne({ username })
    },
    
    // Query to get the authenticated user's information
    // The 'me' query relies on the context to check if the user is authenticated
    me: async (_parent: any, _args: any, context: any) => {
      // If the user is authenticated, find and return the user's information along with their thoughts
      if (context.user) {
        return User.findOne({ _id: context.user._id })
      }
      // If the user is not authenticated, throw an AuthenticationError
      throw new AuthenticationError('Could not authenticate user.');
    },
    // books: async () => {
    //   return Book.find() // Query to retrieve all books
    // }
    getBooks: async (_parent: any, { title, author, genre }: GetBooksArgs) => {
      // Build a filter object based on the provided arguments
      const filter: any = {};
      if (title) filter.title = { $regex: title, $options: 'i' }; // Case-insensitive search
      if (author) filter.author = { $regex: author, $options: 'i' };
      if (genre) filter.genre = { $regex: genre, $options: 'i' };

      return Book.find(filter);
    },
  },
  Mutation: {
    addUser: async (_parent: any, { input }: AddUserArgs) => {
      // Create a new user with the provided username, email, and password
      const user = await User.create({ ...input });
    
      // Sign a token with the user's information
      const token = signToken(user.username, user.email, user._id);
    
      // Return the token and the user
      return { token, user };
    },
    
    login: async (_parent: any, { email, password }: LoginUserArgs) => {
      // Fetch the user by email
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('No user found with this email.');
      }
    
      // Verify the password
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect password.');
      }
    
      // Generate a token
      const token = signToken(user.username, user.email, user._id);
    
      // Return token and user object
      return { 
        token, 
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
        },
      };
    },
    
    addBook: async (_parent: any, { title, author, genre }: AddBookArgs) => {
      // Create a new book entry in the database
      const newBook = await Book.create({ title, author, genre });
      return newBook;
    },
  },
};

export default resolvers;