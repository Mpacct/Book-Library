import { gql } from '@apollo/client';

export const CREATE_USER = gql`
    mutation AddUser(
        $username: String!
        $email: String!
        $password: String!
        ) {
        addUser(
            username: $username
            email: $email
            password: $password
        ) {
            token
            user {
                _id
            }
        }
    }
`;

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const SAVE_BOOK = gql`
    mutation Mutation($input: bookData!) {
        saveBook(input: $input) {
        _id
        username
        savedBooks {
            bookId
            authors
            description
            image
            link
            title
        }
        bookCount
        }
    }
`;

export const DELETE_BOOK = gql`
    mutation Mutation($bookId: ID!) {
        deleteBook(bookId: $bookId) {
        _id
        username
        savedBooks {
            bookId
            authors
            description
            image
            link
            title
        }
        bookCount
        }
    }
`;