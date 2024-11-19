import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
import dotenv from 'dotenv';

dotenv.config();

// Middleware for authenticating the token
export const authenticateToken = ({ req }: any) => {
  // Retrieve token from body, query, or headers
  let token = req.body.token || req.query.token || req.headers.authorization;

  // If token is in the 'Authorization' header, extract it
  if (req.headers.authorization) {
    token = token.split(' ').pop().trim();
  }

  // If no token is provided, set `req.user` as null and return
  if (!token) {
    req.user = null;
    return req;
  }

  try {
    // Verify the token and attach user data to `req.user`
    const { data }: any = jwt.verify(token, process.env.JWT_SECRET_KEY || '', {
      maxAge: '2h', // Set token expiration time
    });
    req.user = data;
  } catch (err) {
    // Log the error for debugging and clear `req.user`
    console.error('Invalid or expired token:', err);
    req.user = null;
  }

  return req; // Return the modified request object
};

// Utility for signing tokens
export const signToken = (username: string, email: string, _id: unknown) => {
  const payload = { username, email, _id };
  const secretKey = process.env.JWT_SECRET_KEY || 'defaultSecret'; // Fallback for local dev
  return jwt.sign({ data: payload }, secretKey, { expiresIn: '2h' });
};

// Custom error for unauthenticated requests
export class AuthenticationError extends GraphQLError {
  constructor(message: string) {
    super(message, undefined, undefined, undefined, ['UNAUTHENTICATED']);
    Object.defineProperty(this, 'name', { value: 'AuthenticationError' });
  }
};


