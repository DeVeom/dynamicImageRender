import puppeteer from 'puppeteer';
import aws from 'aws-sdk';
import { envConfig, logger } from '../config';
import { formatDateString } from '../utils/dateUtils';
import { CACHE_PERIOD, IMAGE_TYPE, PUPPETEER_OPTIONS } from '../utils/contants';
const { awsEnv, layoutUrl } = envConfig;

const s3 = new aws.S3({
  accessKeyId: awsEnv.accessKeyId,
  secretAccessKey: awsEnv.secretAccessKey,
  region: awsEnv.region,
});

export const createScreenshot = async (channelId, layoutType) => {
  let result;
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: PUPPETEER_OPTIONS,
    });
    const page = await browser.newPage();

    await page.goto(
      `${layoutUrl}${
        layoutType === 'large' ? 'bigreport/' : 'smallreport/'
      }${channelId}`,
      { waitUntil: 'domcontentloaded' }
    );

    await page.waitForSelector('#root > div > div');
    const caputreArea = await page.$('#root > div > div');

    const capturedImage = await caputreArea.screenshot({
      quality: 100,
      type: IMAGE_TYPE,
    });

    const params = {
      ACL: 'public-read',
      Bucket: `${
        awsEnv.bucket
      }/report-images/${layoutType}/${channelId}/${formatDateString(
        new Date(),
        '/',
        'YYYYMM'
      )}`,
      Key: `${channelId}-report-image-${formatDateString(
        new Date(),
        '',
        'YYYYMMDD'
      )}-${layoutType}.${IMAGE_TYPE}`,
      ContentType: 'image/webp',
      CacheContorl: `max-age=${CACHE_PERIOD},must-revalidate,public`,
      Body: capturedImage,
    };

    const options = {
      partSize: 5 * 1024 * 1024,
      queueSize: 1,
    };

    result = await s3.upload(params, options).promise();

    await page.close();
    await browser.close();
  } catch (err) {
    logger.error(err);
  } finally {
    return result;
  }
};

export const getScreenshot = async (channelId, layoutType) => {
  let result;
  try {
    const params = {
      Bucket: `${
        awsEnv.bucket
      }/report-images/${layoutType}/${channelId}/${formatDateString(
        new Date(),
        '/',
        'YYYYMM'
      )}`,
      Key: `${channelId}-report-image-${formatDateString(
        new Date(),
        '',
        'YYYYMMDD'
      )}-${layoutType}.${IMAGE_TYPE}`,
    };
    result = await s3.getObject(params).promise();
  } catch (err) {
    if (err.name == 'NoSuchKey') {
      result = null;
    } else logger.error(err);
  } finally {
    return result;
  }
};

export const getS3ImageByDate = async (imageParams) => {
  const { channelId, layoutType, bucketFilter, keyFilter } = imageParams;
  let result;
  try {
    const params = {
      Bucket: awsEnv.bucket,
      Prefix: keyFilter
        ? `report-images/${layoutType}/${channelId}/${bucketFilter}/${channelId}-report-image-${keyFilter}`
        : `report-images/${layoutType}/${channelId}/${bucketFilter}/${channelId}`,
      MaxKeys: 4000,
    };
    if (bucketFilter.length === 4)
      params.Prefix = `report-images/${layoutType}/${channelId}/${bucketFilter}`;

    result = await s3.listObjects(params).promise();
  } catch (err) {
    logger.error(err);
    result = null;
  } finally {
    return result;
  }
};
