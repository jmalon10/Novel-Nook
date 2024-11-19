import express from 'express';
import path from 'node:path';
import { ApolloServer } from '@apollo/server'; // Import from Apollo Server
import { expressMiddleware } from '@apollo/server/express4'; // Import expressMiddleware for Apollo
import { typeDefs, resolvers } from './schemas/index.js'; // Adjust import paths
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const authenticateToken = (req: express.Request) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY || '', { maxAge: '2h' });
    return decoded; // Return decoded user data if the token is valid
  } catch (err) {
    console.log('Invalid token');
    return null;
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  await server.start();
  const app = express();
  const PORT = process.env.PORT || 3001;

  // Middleware for handling GraphQL requests
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // Set up expressMiddleware for Apollo Server and pass context here
  app.use('/graphql', expressMiddleware(server, {
    context: async ({ req }: { req: express.Request }) => {
      const user = authenticateToken(req); // Authenticate token and get user data
      return { user }; // Return user in the context
    },
  }));

  // Serve static files in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}`);
  });
};

startApolloServer();



