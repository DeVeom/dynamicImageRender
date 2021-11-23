import envConfig from '../config';
import { formatDateString } from '../utils/dateFormatter';
import { createOgImage, getOgImage } from '../modules/ogImageHandler';
import { ApolloError } from 'apollo-server-errors';

export const generateOgImage = async (parent, args) => {
  const { channelId, layoutType } = args;
  if (!channelId) {
    throw new ApolloError('channelId must be contained', 'INVALID_CHANNEL_ID', {
      parameter: 'channelId',
    });
  }
  let data = await getOgImage(channelId, layoutType || 'large');

  const { awsEnv } = envConfig;
  let imageUrl = `https://${awsEnv.bucket}.s3.${
    awsEnv.region
  }.amazonaws.com/og-images/${formatDateString(
    new Date(),
    '-'
  )}/${channelId}-og-image-${formatDateString(
    new Date(),
    ''
  )}-${layoutType}.jpeg`;

  if (!data) {
    data = await createOgImage(channelId, layoutType || 'large');
    imageUrl = data.Location;
  }
  const image = {
    message: 'Get Open Graph image url succeeded',
    imageUrl,
  };
  return image;
};
