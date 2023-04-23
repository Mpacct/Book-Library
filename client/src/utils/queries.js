import { gql } from '@apollo/client';

export const QUERY_USER = gql`
    query getMe {
        me {
        _id
        username
        email
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