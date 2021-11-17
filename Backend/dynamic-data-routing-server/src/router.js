import express from 'express';
import { getPong } from './service';

const router = express.Router();

router.get('/ping', async (req, res, next) => {
  const pong = await getPong();
  res.status(200).json(pong);
});

export default router;
