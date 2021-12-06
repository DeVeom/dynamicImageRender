import { envConfig, logger } from '../config';
import { formatDateString } from '../utils/dateUtils';
import {
  createScreenshot,
  getScreenshot,
  getS3ImageByDate,
} from '../modules/imageHandler';

const generateScreenshot = async (params) => {
  const { channelId, layoutType } = params;
  logger.info(
    `generateScreenshot call - channerId: ${channelId} layoutType: ${layoutType}`
  );
  let data = await getScreenshot(channelId, layoutType);

  const { awsEnv } = envConfig;
  let imageUrl = `https://${awsEnv.bucket}.s3.${
    awsEnv.region
  }.amazonaws.com/report-images/${layoutType}/${channelId}/${formatDateString(
    new Date(),
    '/',
    'YYYYMM'
  )}/${channelId}-report-image-${formatDateString(
    new Date(),
    '',
    'YYYYMMDD'
  )}-${layoutType}.webp`;

  if (!data) {
    data = await createScreenshot(channelId, layoutType);
    imageUrl = data.Location;
    logger.info(`${channelId} - ${layoutType} : new image created`);
  }
  const image = {
    message: 'Get report-image url succeeded',
    imageUrl,
  };
  return image;
};

const getImageByDate = async (params) => {
  const { channelId, layoutType } = params;
  logger.info(
    `getImageByDate call - channerId: ${channelId} layoutType: ${layoutType}`
  );
  const data = await getS3ImageByDate(params);

  return data;
};

export default { generateScreenshot, getImageByDate };
