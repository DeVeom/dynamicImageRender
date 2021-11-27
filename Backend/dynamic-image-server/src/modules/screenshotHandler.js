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

    await page.goto(`${layoutUrl}${channelId}`, {
      // layoutType path variable로 추가할 것
      waitUntil: 'networkidle0',
    });
    await page.waitForSelector(
      '#root > section > div.Detail_svgReportContainer__2-ECl'
    );
    await page.waitForTimeout(2000);
    const caputreArea = await page.$(
      '#root > section > div.Detail_svgReportContainer__2-ECl'
    );

    const capturedImage = await caputreArea.screenshot({
      quality: 100,
      type: TYPE,
    });

    const params = {
      ACL: 'public-read',
      Bucket: `${awsEnv.bucket}/report-images/${formatDateString(
        new Date(),
        '-'
      )}`,
      Key: `${channelId}-report-image-${formatDateString(
        new Date(),
        ''
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
      Bucket: `${awsEnv.bucket}/report-images/${formatDateString(
        new Date(),
        '-'
      )}`,
      Key: `${channelId}-report-image-${formatDateString(
        new Date(),
        ''
      )}-${layoutType}.${TYPE}`,
    };
    result = await s3.getObject(params).promise();
  } catch (err) {
    if (err.name == 'NoSuchKey') {
      logger.info(
        `${channelId}-report-image-${formatDateString(
          new Date(),
          ''
        )}-${layoutType}.${TYPE} : new image created`
      );
      result = null;
    } else logger.error(err);
  } finally {
    return result;
  }
};
