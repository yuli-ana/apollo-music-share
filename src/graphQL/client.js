import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { WebSocketLink } from 'apollo-link-ws';

// Mutation enables to add/remove items from the queue
// TypeDefs(type definitions) property tells Apollo client about state I want to manage/ it creates a schema to tell apollo what I want to be querying, data itself, structure of data  and  mutations


//Instead of type Song create a custom type "input" object that collects all of the individual arguments that I normally pass to mutation 

const client = new ApolloClient({
    link: new WebSocketLink({

        uri: 'wss://welcome-chipmunk-46.hasura.app/v1/graphql',
        options: {
            reconnect: true,
        }
    }),
    cache: new InMemoryCache(),
    // Defined: what song data gonna consist of, how to query data and how to make changes to it

    // GraphQL schema defines what types of data a client can read and write to my data graph
    typeDefs: gql`
    type Song {
        id: uuid!,
        title: String!,
        artist: String!,
        thumbnail: String!,
        duration: Float!,
        ulr: String!
    }

    input SongInput {
        id: uuid!,
        title: String!,
        artist: String!,
        thumbnail: String!,
        duration: Float!,
        ulr: String!
    }

    type Query {
        queue: [Song]!,
    }

    type Mutation {
        addOrRemoveFromQueue(input: SongInput): [Song]!
    }
    `
});


client.writeQuery({
    query: gql`
      query GetQueue {
        queue
      }
    `,
    data: {
        queue: []
    }
});



// const client = new ApolloClient({
//     uri: 'https://welcome-chipmunk-46.hasura.app/v1/graphql',
//     cache: new InMemoryCache()
// });

export default client;
