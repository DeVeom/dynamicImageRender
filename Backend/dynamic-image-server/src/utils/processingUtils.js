import { envConfig } from '../config';
import { checkDateRegExp } from './dateUtils';

const { awsEnv } = envConfig;

export const processImageData = (imageData, dateFilter) => {
  const { Contents: contents } = imageData;
  const imageUrlList = [];

  for (let image of contents) {
    const imageUrl = image['Key'];
    if (imageUrl.endsWith('.webp'))
      imageUrlList.push(
        `https://${awsEnv.bucket}.s3.${awsEnv.region}.amazonaws.com/${imageUrl}`
      );
  }

  const data = {
    message: 'Get report-image url list succeeded',
    dateFilter,
    imageUrlList,
  };

  if (checkDateRegExp(dateFilter)) {
    data['imageUrl'] = imageUrlList[0];
    delete data.imageUrlList;
  }
  return data;
};
