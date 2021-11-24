import { envConfig, logger } from '../config';
import { formatDateString } from '../utils/dateFormatter';
import { createScreenshot, getScreenshot } from '../modules/screenshotHandler';
import { ApolloError } from 'apollo-server-errors';

export const generateScreenshot = async (parent, args, context, info) => {
  logger.verbose(`${info.path.typename}: ${info.path.key}`);
  const { channelId } = args;
  if (!channelId) {
    throw new ApolloError('channelId must be contained', 'INVALID_CHANNEL_ID', {
      parameter: 'channelId',
    });
  }
  let { layoutType } = args;
  if (!layoutType || layoutType === 'undefined') layoutType = 'large';
  logger.info(`channerId: ${channelId}, layoutType: ${layoutType}`);
  // let data = await getScreenshot(channelId, layoutType);

  // const { awsEnv } = envConfig;
  // let imageUrl = `https://${awsEnv.bucket}.s3.${
  //   awsEnv.region
  // }.amazonaws.com/report-images/${formatDateString(
  //   new Date(),
  //   '-'
  // )}/${channelId}-report-image-${formatDateString(
  //   new Date(),
  //   ''
  // )}-${layoutType}.jpeg`;

  // if (!data) {
  //   data = await createScreenshot(channelId, layoutType);
  //   imageUrl = data.Location;
  // }
  const image = {
    message: 'Get report screenshot image url succeeded',
    imageUrl: 'this is test !',
  };
  return image;
};
