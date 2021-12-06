import { ApolloServer } from 'apollo-server-express';
import typeDefs from './schema';
import { imageService } from '../services';
import { logger } from '../config';
import { ApolloError } from 'apollo-server-errors';

export default async (app) => {
  const resolvers = {
    Query: {
      info: () =>
        'Generating screenshot image of channel performance report by channel',
    },
    LayoutType: {
      SMALL: 'small',
      LARGE: 'large',
    },
    Mutation: {
      generateScreenshot: async (parent, args, context, info) => {
        logger.verbose(
          `Apollo server - ${info.path.typename}: ${info.path.key}`
        );
        const { channelId } = args;
        if (!channelId) {
          throw new ApolloError(
            'channelId must be contained',
            'INVALID_CHANNEL_ID',
            {
              parameter: 'channelId',
            }
          );
        }
        let { layoutType } = args;
        if (!layoutType || layoutType === 'undefined') layoutType = 'large';
        const data = await imageService.generateScreenshot({
          channelId,
          layoutType,
        });
        return data;
      },
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
    context: ({ req }) => {
      return { req };
    },
    formatError,
    debug: false,
  });

  await server.start();
  server.applyMiddleware({ app });
};
