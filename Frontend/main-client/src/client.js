import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://2471-116-124-50-130.ngrok.io/graphql',
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
