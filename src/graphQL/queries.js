import { gql } from '@apollo/client';

// @client annotation tells apollo to perform this query only on client


export const GET_QUEUED_SONGS = gql`
query getQueuedSongs {
    queue @client {
        id
        duration
        title
        artist
        thumbnail
        url
    }
}
`;