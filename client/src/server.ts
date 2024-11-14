// src/server.ts
import { ApolloServer } from 'apollo-server';
import mongoose from 'mongoose';
import typeDefs from './graphql/schema';
import resolvers from './graphql/resolvers';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose.connect('mongodb://localhost:27017/novelbookapp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    return server.listen({ port: 4000 });
  })
  .then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
