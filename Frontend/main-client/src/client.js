import { ApolloClient, InMemoryCache } from '@apollo/client';

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
});

export default client;
