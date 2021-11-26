import express from 'express';
import cors from 'cors';
import { logger } from '../config';
import router from '../router';

export default async (app) => {
  app.use(cors());
  app.use(express.json());

  app.use(router);

  app.use((err, req, res, next) => {
    const { status, message } = err;
    logger.error(`status: ${status}, ${message}`);
    res
      .status(status || 500)
      .json({ error: { message: message || 'internal server error' } });
  });
};
