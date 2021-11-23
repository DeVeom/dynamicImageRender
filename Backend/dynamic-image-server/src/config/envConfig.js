import path from 'path';
import dotenv from 'dotenv';

if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: path.join(__dirname, '../../.env.production') });
} else if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: path.join(__dirname, '../../.env.development') });
} else {
  throw new Error('porcess.env.NODE_ENV is not set!');
}

export default {
  port: process.env.PORT,
  awsEnv: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SCERET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    bucket: process.env.AWS_S3_BUCKET,
  },
  layoutUrl: process.env.GENERATE_OG_LAYOUT_URL,
};
