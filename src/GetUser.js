import { gql } from '@apollo/client';

export const GET_USER = gql`
    query GetUser($id: ID!) {
        user(id: $id) {
            id
            name
            username
            email
        }
    }
`;

export const GET_USER_POSTS = gql`
    query GetUserPosts($userId: ID!) {
        user(id: $userId) {
            posts {
                data {
                    id
                    title
                    body
                }
            }
        }
    }
`;

