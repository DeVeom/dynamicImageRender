import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://dd09-116-124-50-130.ngrok.io/graphql',
  cache: new InMemoryCache(),
});

export default client;
