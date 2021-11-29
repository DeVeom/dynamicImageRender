import express from 'express';
import { logger } from './config';
import { generateScreenshot, getScreenshotByDate } from './services';
import {
  checkDateRegExp,
  checkYearMonthRegExp,
  checkYearRegExp,
} from './utils/dateFormatter';

const router = express.Router();

router.get('/image/:layoutType/:channelId', async (req, res, next) => {
  try {
    logger.verbose('Router.image.get');

    const { channelId, layoutType } = req.params;
    if (!channelId) {
      throw new Error('channelId must be contained');
    }

    const { dateFilter } = req.query;
    let data;

    if (!dateFilter) {
      data = await generateScreenshot(channelId, layoutType);
      res.status(200).json(data);
    }
    const params = { channelId, layoutType };
    if (checkDateRegExp(dateFilter)) {
      const splittedArr = dateFilter.split('/');
      const dateWithoutSapce = splittedArr.join('');
      params['keyFilter'] = dateWithoutSapce;

      splittedArr.pop();
      const monthYearString = splittedArr.join('/');
      params['bucketFilter'] = monthYearString;

      data = await getScreenshotByDate(params);
      res.status(200).json(data);
    } else if (checkYearMonthRegExp(dateFilter)) {
    } else if (checkYearRegExp(dateFilter)) {
    } else {
      throw new Error('dateFilter is invalid value');
    }
  } catch (err) {
    next(err);
  }
});

export default router;
