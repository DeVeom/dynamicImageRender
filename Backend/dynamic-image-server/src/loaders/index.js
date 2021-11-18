import expressLoader from './express';

export default async (expressApp) => {
  await expressLoader(expressApp);
  console.log('Express Initialized');
};
