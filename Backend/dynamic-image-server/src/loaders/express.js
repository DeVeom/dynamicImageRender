import express from 'express';
import router from '../router';
import cors from 'cors';

export default async (app) => {
  app.use(cors());
  app.use(express.json());

  app.use(router);

  app.use((err, req, res, next) => {
    console.error(err);
    const { status, message } = err;
    res
      .status(status || 500)
      .json({ message: message || 'internal server error' });
  });
};
