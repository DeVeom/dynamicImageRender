import { imageService } from '../services';
import {
  checkDateRegExp,
  checkYearMonthRegExp,
  checkYearRegExp,
} from '../utils/dateUtils';
import { processImageData } from '../utils/processingUtils';
import { LAYOUT_TYPE } from '../utils/contants';

const viewImageDirect = async (req, res, next) => {
  try {
    const { channelId, layoutType } = req.params;
    if (!channelId) throw new Error('channelId must be contained');

    if (!(layoutType in LAYOUT_TYPE))
      throw new Error(
        'layout-type is invalid value (layout-type: large, small)'
      );

    const { date } = req.query;

    const params = { channelId, layoutType };
    let data;
    if (!date) {
      data = await imageService.generateScreenshot(params);
    } else {
      if (checkDateRegExp(date)) {
        const splittedArr = date.split('/');
        const dateWithoutSapce = splittedArr.join('');
        params['keyFilter'] = dateWithoutSapce;

        splittedArr.pop();
        const monthYearString = splittedArr.join('/');
        params['bucketFilter'] = monthYearString;

        const imageData = await imageService.getImageByDate(params);
        if (imageData.Contents.length === 0) {
          throw new Error(`image does not exist at ${date}`);
        }
        data = processImageData(imageData, date);
      } else {
        throw new Error(
          'date is invalid value (date must be YYYY/MM/DD format)'
        );
      }
    }
    res.redirect(data['imageUrl']);
    next();
  } catch (err) {
    next(err);
  }
};

const getImageUrlsByDate = async (req, res, next) => {
  try {
    const { channelId, layoutType } = req.params;
    if (!channelId) throw new Error('channelId must be contained');

    if (!(layoutType in LAYOUT_TYPE))
      throw new Error(
        'layout-type is invalid value (layout-types: large, small)'
      );

    const { dateFilter } = req.query;
    let data;

    const params = { channelId, layoutType };
    if (!dateFilter) {
      data = await imageService.generateScreenshot(params);
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
};

export default { viewImageDirect, getImageUrlsByDate };
