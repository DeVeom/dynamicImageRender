import { envConfig } from '../config';
import { formatDateString } from '../utils/dateFormatter';
import { createScreenshot, getScreenshot } from '../modules/screenshotHandler';

export const generateScreenshot = async (channelId, layoutType) => {
  let data = await getScreenshot(channelId, layoutType);

  const { awsEnv } = envConfig;
  let imageUrl = `https://${awsEnv.bucket}.s3.${
    awsEnv.region
  }.amazonaws.com/report-images/${formatDateString(
    new Date(),
    '-'
  )}/${channelId}-report-image-${formatDateString(
    new Date(),
    ''
  )}-${layoutType}.jpeg`;

  if (!data) {
    data = await createScreenshot(channelId, layoutType);
    imageUrl = data.Location;
  }
  const image = {
    message: 'Get report screenshot image url succeeded',
    imageUrl,
  };
  return image;
};
