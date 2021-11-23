import express from 'express';
import cors from 'cors';

export default async (app) => {
  app.use(cors());
  app.use(express.json());
};
