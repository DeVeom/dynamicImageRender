import puppeteer from 'puppeteer';
import aws from 'aws-sdk';
import { envConfig, logger } from '../config';
import { formatDateString } from '../utils/dateFormatter';

const { awsEnv, layoutUrl } = envConfig;

const s3 = new aws.S3({
  accessKeyId: awsEnv.accessKeyId,
  secretAccessKey: awsEnv.secretAccessKey,
  region: awsEnv.region,
});

const TYPE = 'jpeg';

export const createScreenshot = async (channelId, layoutType) => {
  let result;

  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        '--lang=ko-kr,kr',
        '--disable-gpu',
        '--disable-dev-shm-usage',
        '--disable-setuid-sandbox',
        '--no-sandbox',
      ],
    });
    const page = await browser.newPage();

    await page.goto(
      `${layoutUrl}${
        layoutType === 'large' ? 'bigreport/' : 'smallreport/'
      }${channelId}`,
      {
        waitUntil: 'networkidle0',
      }
    );
    await page.waitForSelector('#root > div > div');
    await page.waitForTimeout(2000);
    const caputreArea = await page.$('#root > div > div');

    const capturedImage = await caputreArea.screenshot({
      quality: 100,
      type: TYPE,
    });

    const params = {
      ACL: 'public-read',
      Bucket: `${awsEnv.bucket}/report-images/${layoutType}/${formatDateString(
        new Date(),
        '/',
        'YYYYMM'
      )}`,
      Key: `${channelId}-report-image-${formatDateString(
        new Date(),
        '',
        'YYYYMMDD'
      )}-${layoutType}.${TYPE}`,
      ContentType: 'image/jpeg',
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
      Bucket: `${awsEnv.bucket}/report-images/${layoutType}/${formatDateString(
        new Date(),
        '/',
        'YYYYMM'
      )}`,
      Key: `${channelId}-report-image-${formatDateString(
        new Date(),
        '',
        'YYYYMMDD'
      )}-${layoutType}.${TYPE}`,
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

export const getScreenshotList = async (imageParams) => {
  const { channelId, layoutType, bucketFilter, keyFilter } = imageParams;
  let result;
  try {
    const params = {
      Bucket: awsEnv.bucket,
      Prefix: keyFilter
        ? `report-images/${layoutType}/${bucketFilter}/${channelId}-report-image-${keyFilter}`
        : channelId,
      MaxKeys: 4000,
    };

    result = await s3.listObjects(params).promise();
  } catch (err) {
    logger.error(err);
    result = null;
  } finally {
    return result;
  }
};
