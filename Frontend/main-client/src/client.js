import { ApolloClient, InMemoryCache } from '@apollo/client';

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'network-only',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
  },
  mutate: {
    errorPolicy: 'all',
  },
};

const client = new ApolloClient({
  uri: process.env.REACT_APP_BACKEND_HOST,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          getChannelsForList: {
            merge(existing, incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
  defaultOptions,
});

export default client;
