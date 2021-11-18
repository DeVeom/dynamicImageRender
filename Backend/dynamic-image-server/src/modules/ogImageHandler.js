import puppeteer from 'puppeteer';
import aws from 'aws-sdk';
import envConfig from '../config';
import { formatDateString } from '../utils/dateFormatter';

const { awsEnv, layoutUrl } = envConfig;

const s3 = new aws.S3({
  accessKeyId: awsEnv.accessKeyId,
  secretAccessKey: awsEnv.secretAccessKey,
  region: awsEnv.region,
});

let result;
const dateWithDash = formatDateString(new Date(), '-');
const dateWithNoSpace = formatDateString(new Date(), '');
const fixedFilenameFormat = `-og-image-${dateWithNoSpace}`;
const type = 'jpeg';

export const createOgImage = async (channelId, layoutType) => {
  try {
    const browser = await puppeteer.launch({
      args: ['--lang=ko-kr,kr'],
    });
    const page = await browser.newPage();

    await page.goto(`${layoutUrl}${channelId}`, {
      // layoutType path variaable로 추가할 것
      waitUntil: 'networkidle0',
    });
    await page.waitForSelector(
      '#root > div > div > div > div.layoutCantainer > div:nth-child(2) > div > div.channel-detail-info-wrap.channel-basic-info > div'
    );
    const caputreArea = await page.$(
      '#root > div > div > div > div.layoutCantainer > div:nth-child(2) > div > div.channel-detail-info-wrap.channel-basic-info > div'
    );

    const capturedImage = await caputreArea.screenshot({
      quality: 100,
      type: type,
    });

    const params = {
      ACL: 'public-read',
      Bucket: `${awsEnv.bucket}/og-images/${dateWithDash}`,
      Key: `${channelId}${fixedFilenameFormat}-${layoutType}.${type}`,
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
    console.log(`${layoutUrl}${channelId}`);
    console.error(err);
  } finally {
    return result;
  }
};

export const getOgImage = async (channelId, layoutType) => {
  try {
    const params = {
      Bucket: `${awsEnv.bucket}/og-images/${dateWithDash}`,
      Key: `${channelId}${fixedFilenameFormat}-${layoutType}.${type}`,
    };
    result = await s3.getObject(params).promise();
  } catch (err) {
    if (err.name == 'NoSuchKey')
      console.log(
        `[${dateWithDash}-${layoutType}] ${channelId} : new image created`
      );
    else console.error(err);
  } finally {
    return result;
  }
};
