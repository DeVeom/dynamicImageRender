import expressLoader from './express';
import apolloServerLoader from './apolloServer';

export default async (expressApp) => {
  await apolloServerLoader(expressApp);
  console.log('Apollo Server Initialized');
  await expressLoader(expressApp);
  console.log('Express Initialized');
};
