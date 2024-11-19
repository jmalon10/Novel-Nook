const typeDefs = `
type User {
  _id: ID!
  username: String!
  email: String!
  books: [Book]! # User's library, can be empty
}

type Book {
  _id: ID # Optional, as embedded documents might not have _id
  title: String!
  author: String!
  genre: String
}

# Input type for adding a book
input AddBookInput {
  title: String!
  author: String!
  genre: String
}

# Type for the authentication payload
type AuthPayload {
  token: String!
  user: User!
}

# Queries for retrieving data
type Query {
  users: [User!]!
  user(username: String!): User
  me: User
  getBooks(title: String, author: String, genre: String): [Book!]!
}

# Input type for user registration
input AddUserInput {
  username: String!
  email: String!
  password: String!
}

# Mutations for user actions
type Mutation {
  addUser(input: AddUserInput!): AuthPayload!
  login(email: String!, password: String!): AuthPayload!
  addBook(input: AddBookInput!): User!
  removeBook(cover_id: Int!): User!
}
`;

export default typeDefs;
