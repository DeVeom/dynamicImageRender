import { envConfig, logger } from '../config';
import { formatDateString } from '../utils/dateFormatter';
import { createScreenshot, getScreenshot } from '../modules/screenshotHandler';
import { ApolloError } from 'apollo-server-errors';

export const generateScreenshot = async (parent, args) => {
  logger.info(`channerId: ${channelId}`);
  const { channelId, layoutType } = args;
  if (!channelId) {
    throw new ApolloError('channelId must be contained', 'INVALID_CHANNEL_ID', {
      parameter: 'channelId',
    });
  }
  let data = await getScreenshot(channelId, layoutType || 'large');

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
    data = await createScreenshot(channelId, layoutType || 'large');
    imageUrl = data.Location;
  }
  const image = {
    message: 'Get report screenshot image url succeeded',
    imageUrl,
  };
  return image;
};
