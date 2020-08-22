import { ApolloClient, InMemoryCache } from '@apollo/client';
import { WebSocketLink } from 'apollo-link-ws';

const client = new ApolloClient({
    link: new WebSocketLink({

        uri: 'wss://welcome-chipmunk-46.hasura.app/v1/graphql',
        options: {
            reconnect: true,
        }
    }),
    cache: new InMemoryCache()
})

// const client = new ApolloClient({
//     uri: 'https://welcome-chipmunk-46.hasura.app/v1/graphql',
//     cache: new InMemoryCache()
// });

export default client;
