import { envConfig, logger } from '../config';
import { formatDateString } from '../utils/dateFormatter';
import {
  createScreenshot,
  getScreenshot,
  getScreenshotList,
} from '../modules/screenshotHandler';

export const generateScreenshot = async (channelId, layoutType) => {
  let data = await getScreenshot(channelId, layoutType);

  const { awsEnv } = envConfig;
  let imageUrl = `https://${awsEnv.bucket}.s3.${
    awsEnv.region
  }.amazonaws.com/report-images/${layoutType}/${formatDateString(
    new Date(),
    '/',
    'YYYYMM'
  )}/${channelId}-report-image-${formatDateString(
    new Date(),
    '',
    'YYYYMMDD'
  )}-${layoutType}.jpeg`;

  if (!data) {
    data = await createScreenshot(channelId, layoutType);
    imageUrl = data.Location;
    logger.info(`${imageUrl} : new image created`);
  }
  const image = {
    message: 'Get report screenshot image url succeeded',
    imageUrl,
  };
  return image;
};

export const getScreenshotByDate = async (params) => {
  const data = await getScreenshotList(params);

  return data;
};
