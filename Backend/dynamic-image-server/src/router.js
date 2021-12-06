import express from 'express';
import { logReqInfo, logResInfo } from './middlewares/httpLogger';
import { imageController } from './controllers';

const router = express.Router();

router.get(
  '/image/view/:layoutType/:channelId',
  logReqInfo,
  imageController.viewImageDirect,
  logResInfo
);

router.get(
  '/image/json/:layoutType/:channelId',
  logReqInfo,
  imageController.getImageUrlsByDate,
  logResInfo
);

export default router;
