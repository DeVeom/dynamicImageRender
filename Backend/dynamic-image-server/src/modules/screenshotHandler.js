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

const dateWithDash = formatDateString(new Date(), '-');
const dateWithNoSpace = formatDateString(new Date(), '');
const fixedFilenameFormat = `-report-image-${dateWithNoSpace}-`;
const type = 'jpeg';

export const createScreenshot = async (channelId, layoutType) => {
  let result;
  try {
    const browser = await puppeteer.launch({
      args: ['--lang=ko-kr,kr'],
    });
    const page = await browser.newPage();

    await page.goto(`${layoutUrl}${channelId}`, {
      // layoutType path variable로 추가할 것
      waitUntil: 'networkidle0',
    });
    await page.waitForSelector('#root > section > svg'); // 실제 레이아웃 페이지에 맞는 selector로 변경
    await page.waitForTimeout(2000);
    const caputreArea = await page.$('#root > section > svg');

    const capturedImage = await caputreArea.screenshot({
      quality: 100,
      type: type,
    });

    const params = {
      ACL: 'public-read',
      Bucket: `${awsEnv.bucket}/report-images/${dateWithDash}`,
      Key: `${channelId}${fixedFilenameFormat}${layoutType}.${type}`,
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
      Bucket: `${awsEnv.bucket}/report-images/${dateWithDash}`,
      Key: `${channelId}${fixedFilenameFormat}${layoutType}.${type}`,
    };
    result = await s3.getObject(params).promise();
  } catch (err) {
    if (err.name == 'NoSuchKey') {
      logger.info(
        `${channelId}${fixedFilenameFormat}${layoutType}.${type} : new image created`
      );
      result = null;
    } else logger.error(err);
  } finally {
    return result;
  }
};
