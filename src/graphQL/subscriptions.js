import { gql } from '@apollo/client';
// All graphQL queries live here

export const GET_SONGS = gql`
subscription getSongs {
    songs(order_by: {created_at: desc}){
        artist
        duration
        id
        thumbnail
        title
        url
    }
  }
`;

