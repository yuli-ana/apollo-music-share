import { gql } from '@apollo/client';

//Instead of using all individual arguments will bring in an input

export const ADD_OR_REMOVE_FROM_QUEUE = gql`
mutation addOrRemoveFromQueue($input: SongInput!){
  addOrRemoveFromQueue(input: $input) @client
}
`;

export const ADD_SONG = gql`
mutation addSong($title: String!, $artist: String!, $thumbnail: String!, $duration: Float!, $url: String!) {
    insert_songs(objects: {url: $url, title: $title, thumbnail: $thumbnail, duration: $duration, artist: $artist}) {
      affected_rows
    }
  }
`;

// export default ADD_SONG;