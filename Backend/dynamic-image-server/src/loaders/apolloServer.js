import { ApolloServer } from 'apollo-server-express';
import typeDefs from './schema';
import { imageService } from '../services';
import { logger } from '../config';
import { ApolloError } from 'apollo-server-errors';
import { NS_PER_SEC, MS_PER_NS } from '../utils/contants';

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
        const {
          req: { headers, startTime, originalUrl },
        } = context;

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
        const diff = process.hrtime(startTime);
        logger.http(
          `RES ${headers.host} ${originalUrl}  elapsed: ${
            Math.round((diff[0] * NS_PER_SEC + diff[1]) * MS_PER_NS * 100) / 100
          }ms`
        );
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
      const resStartTime = process.hrtime();
      req.startTime = resStartTime;
      return { req };
    },
    formatError,
    debug: false,
  });

  await server.start();
  server.applyMiddleware({ app });
};
