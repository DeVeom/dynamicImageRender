import { ApolloServer } from 'apollo-server-express';
import typeDefs from './schema';
import { generateScreenshot } from '../resolvers';
import { logger } from '../config';

export default async (app) => {
  const resolvers = {
    Query: {
      info: () =>
        'Generating screenshot image of channel performance report by channel',
    },
    LayoutType: {
      SMALL: 'small',
      MID: 'mid',
      LARGE: 'large',
    },
    Mutation: {
      generateScreenshot: generateScreenshot,
    },
  };

  const formatError = (err) => {
    logger.error('--- GraphQL Error ---');
    logger.error('Path: ', err.path);
    logger.error('Message: ', err.message);
    logger.error('Code: ', err.extensions.code);
    logger.error('Original Error: ', err.originalError);
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
