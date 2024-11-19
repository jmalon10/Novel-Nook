import { User } from '../models/index.js';
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


const resolvers = {
  Query: {
    users: async () => {
      return User.find()
    },
    user: async (_parent: any, { username }: UserArgs) => {
      console.log(`USERNAME: ${username}`);
      return User.findOne({ username })
    },
    
    // Query to get the authenticated user's information
    // The 'me' query relies on the context to check if the user is authenticated
    getUserBooks: async (_parent: any, {username}: any, context: any) => {
      if (!context.user) {
        throw new AuthenticationError('You must be logged in to perform this action.');
      }
     console.log(username);
      const user = await User.findById(context.user.data._id);
    
      if (!user) {
        throw new Error('User not found.');
      }
      console.log(user.books);
      return user.books; // Return the books array from the user document
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
    
    addBook: async (_parent: any, { input }: { input: { title: string; author: string; genre: string } }, context: any) => {
      if (!context.user) {
        throw new AuthenticationError('You must be logged in to perform this action.');
      }
      console.log(`CONTEXT USER: ${context.user.data._id}`);
      const user = await User.findById(context.user.data._id);
  
      if (!user) {
        throw new Error('User not found.');
      }
  
      // Add the new book to the user's library
      user.books.push(input);
      await user.save();
  
      return user; // Return the updated user object
    },
    removeBook: async (_parent: any, { cover_id }: { cover_id: number }, context: any) => {
      // Ensure the user is authenticated
      if (!context) {
        throw new AuthenticationError('You must be logged in to perform this action.');
      }

      // Find the user by their ID from the context (the decoded JWT payload)
      const user = await User.findById(context.user._id);
      if (!user) {
        throw new Error('User not found.');
      }

      // Remove the book with the given cover_id from the user's books array
      user.books = user.books.filter((book: any) => book.cover_id !== cover_id);

      // Save the updated user object
      await user.save();

      // Return the updated user object with the updated books array
      return user;
    },
  },
};

export default resolvers;