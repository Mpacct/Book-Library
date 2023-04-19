const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: [bookSchema]
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    user(_id: ID!): [bookSchema]
  }

  type Mutation {
    addUser(
        username: String!
        email: String!
        password: String!
      ): Auth
    login(email: String!, password: String!): Auth
    saveBook(
        _id: ID!
        bookSchema!
    ): User
    deleteBook(
        _id: ID!
        bookSchema!
    ): User
  }
`;

module.exports = typeDefs;