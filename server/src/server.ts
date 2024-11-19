import express from 'express';
import path from 'node:path';
import { ApolloServer } from '@apollo/server'; // Import from Apollo Server
import { expressMiddleware } from '@apollo/server/express4'; // Import expressMiddleware for Apollo
import { typeDefs, resolvers } from './schemas/index.js'; // Adjust import paths
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from './config/connection.js';
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
  server.start().then(() => {
    app.use('/graphql', express.json(), (req: any, _res, next) => {
      req = authenticateToken(req); 
      next();
    }, expressMiddleware(server, {
      context: async ({ req }) => ({ user: req.user }),
    }))
  }
  );

  await db();
  console.log('Connected to MongoDB!');
  const app = express();
  const PORT = process.env.PORT || 3001;

  // Middleware for handling GraphQL requests
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // Serve static files in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
};

startApolloServer();



