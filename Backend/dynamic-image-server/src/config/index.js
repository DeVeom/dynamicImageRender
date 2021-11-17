import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: path.join(__dirname, 'path/to/.env.production') });
} else if (process.env.NODE_ENV === 'develop') {
  dotenv.config();
} else {
  throw new Error('porcess.env.NODE_ENV is not set!');
}

export default {
  port: process.env.PORT,
  awsEnv: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SCERET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  },
};
