import { gql } from '@apollo/client';


const ADD_SONG = gql`
mutation addSong($title: String!, $artist: String!, $thumbnail: String!, $duration: Float!, $url: String!) {
    insert_songs(objects: {url: $url, title: $title, thumbnail: $thumbnail, duration: $duration, artist: $artist}) {
      affected_rows
    }
  }
`;

export default ADD_SONG;