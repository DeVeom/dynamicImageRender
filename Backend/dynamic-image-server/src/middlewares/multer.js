import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';
import envConfig from '../config';
import { formatDateString } from '../utils/dateFormatter';

const { awsEnv } = envConfig;

const s3 = new aws.S3({
  accessKeyId: awsEnv.accessKeyId,
  secretAccessKey: awsEnv.secretAccessKey,
  region: awsEnv.region,
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: `wecode01/${formatDateString(new Date(), '-')}`,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    metadata: (req, file, cb) => {
      cb(null, { fieldname: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

export default upload;
