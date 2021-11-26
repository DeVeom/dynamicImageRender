import express from 'express';
import { logger } from './config';
import { generateScreenshot } from './services';

const router = express.Router();

router.get('/image/:layoutType/:channelId', async (req, res, next) => {
  try {
    logger.verbose('Router.image.get');

    const { channelId, layoutType } = req.params;
    if (!channelId) {
      throw new Error('channelId must be contained');
    }
    const data = await generateScreenshot(channelId, layoutType);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

export default router;
