import express from 'express';
import { envConfig, logger } from './config';
import loaders from './loaders';

const startServer = async () => {
  try {
    const app = express();
    await loaders(app);

    const { port } = envConfig;
    app.listen(port, () => {
      logger.info(`Image Server ready at ${port} port`);
    });
  } catch (err) {
    logger.error(err);
  }
};

startServer();
