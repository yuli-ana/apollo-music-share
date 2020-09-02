import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { WebSocketLink } from 'apollo-link-ws';
import { GET_QUEUED_SONGS } from './queries';

// Mutation enables to add/remove items from the queue
// TypeDefs(type definition) property tells Apollo client about state I want to manage/ it creates a schema to tell apollo what I want to be querying, data itself, structure of data  and  mutations


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
    `,

    resolvers: {
        Mutation: {
            addOrRemoveFromQueue: (_, { input }, { cache }) => {
                // Read query
                const queryResult = cache.readQuery({
                    query: GET_QUEUED_SONGS
                })

                // Manage, update data
                if (queryResult) {
                    const { queue } = queryResult;
                    const isInQueue = queue.some(song => song.id === input.id);

                    const newQueue = isInQueue ?
                        queue.filter(song => song.id !== input.id)
                        : [...queue, input];

                    // Write back to the query that we read from

                    cache.writeQuery({
                        query: GET_QUEUED_SONGS,
                        data: {
                            queue: newQueue,
                        }
                    })

                    return newQueue;
                }
                return [];
            }
        }
    }
});

// Our app reloads and: 
// Queued items taken from localStorage
// Put in our cache
// And queried using a local query
// And put in our queued songList component


const hasQueue = Boolean(localStorage.getItem("queue"));

// Writing this to a client (to the cache)
client.writeQuery({
    query: gql`
      query GetQueue {
        queue
      }
    `,
    data: {
        queue: hasQueue ? JSON.parse(localStorage.getItem("queue")) : [],
    }
});



// const client = new ApolloClient({
//     uri: 'https://welcome-chipmunk-46.hasura.app/v1/graphql',
//     cache: new InMemoryCache()
// });

export default client;
