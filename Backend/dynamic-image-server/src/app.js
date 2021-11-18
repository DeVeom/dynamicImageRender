import express from 'express';
import envConfig from './config';
import loaders from './loaders';

const startServer = async () => {
  try {
    const app = express();
    await loaders(app);

    const { port } = envConfig;
    app.listen(port, () => {
      console.log(`Image Server is listening on ${port}.`);
    });
  } catch (err) {
    console.error(err);
  }
};

startServer();
