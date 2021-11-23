import expressLoader from './express';
import apolloServerLoader from './apolloServer';
import { logger } from '../config';

export default async (expressApp) => {
  await apolloServerLoader(expressApp);
  logger.info('Apollo Server Initialized');
  await expressLoader(expressApp);
  logger.info('Express Initialized');
};
