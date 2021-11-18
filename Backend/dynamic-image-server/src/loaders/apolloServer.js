import { ApolloServer } from 'apollo-server-express';
import typeDefs from './schema';
import { generateOgImage } from '../resolvers';

export default async (app) => {
  const resolvers = {
    Query: {
      info: () =>
        'Generating Open Graph image of channel performance report by channel',
    },
    LayoutType: {
      SMALL: 'small',
      MID: 'mid',
      LARGE: 'large',
    },
    Mutation: {
      generateOgImage: generateOgImage,
    },
  };

  const formatError = (err) => {
    console.error('--- GraphQL Error ---');
    console.error('Path: ', err.path);
    console.error('Message: ', err.message);
    console.error('Code: ', err.extensions.code);
    console.error('Original Error: ', err.originalError);
    return err;
  };

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError,
    debug: false,
  });

  await server.start();
  server.applyMiddleware({ app });
};
