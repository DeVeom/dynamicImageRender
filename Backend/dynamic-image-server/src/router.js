import express from 'express';
import { logReqInfo, logResInfo } from './middlewares/httpLogger';
import { imageController } from './controllers';
import { setCache } from './middlewares/cacheHandler';

const router = express.Router();

router.get('/liveness', async (req, res, next) => {
  res.status(200).json({});
});

router.get(
  '/image/view/:layoutType/:channelId',
  logReqInfo,
  setCache,
  imageController.viewImageDirect,
  logResInfo
);

router.get(
  '/image/json/:layoutType/:channelId',
  logReqInfo,
  setCache,
  imageController.getImageUrlsByDate,
  logResInfo
);

export default router;
