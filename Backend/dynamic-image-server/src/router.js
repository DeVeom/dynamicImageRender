import express from 'express';
import { logReqInfo, logResInfo } from './middlewares/httpLogger';
import { imageService } from './services';
import {
  checkDateRegExp,
  checkYearMonthRegExp,
  checkYearRegExp,
} from './utils/dateUtils';
import { processImageData } from './utils/processingUtils';

const router = express.Router();

router.get(
  '/image/:layoutType/:channelId',
  logReqInfo,
  async (req, res, next) => {
    try {
      const { channelId, layoutType } = req.params;
      if (!channelId) {
        throw new Error('channelId must be contained');
      }

      const { dateFilter } = req.query;
      let data;

      const params = { channelId, layoutType };
      if (!dateFilter) {
        // const startTime = process.hrtime();
        data = await imageService.generateScreenshot(params);
        // const NS_PER_SEC = 1e9;
        // const MS_PER_NS = 1e-6;
        // const diff = process.hrtime(startTime);
        // console.log(
        //   `elapsed: ${
        //     Math.round((diff[0] * NS_PER_SEC + diff[1]) * MS_PER_NS * 100) / 100
        //   }`
        // );
      } else {
        if (checkDateRegExp(dateFilter)) {
          const splittedArr = dateFilter.split('/');
          const dateWithoutSapce = splittedArr.join('');
          params['keyFilter'] = dateWithoutSapce;

          splittedArr.pop();
          const monthYearString = splittedArr.join('/');
          params['bucketFilter'] = monthYearString;
        } else if (
          checkYearMonthRegExp(dateFilter) ||
          checkYearRegExp(dateFilter)
        ) {
          params['bucketFilter'] = dateFilter;
        } else {
          throw new Error('dateFilter is invalid value');
        }
        const imageData = await imageService.getImageByDate(params);
        data = processImageData(imageData, dateFilter);
      }
      res.status(200).json(data);
      next();
    } catch (err) {
      next(err);
    }
  },
  logResInfo
);

export default router;
