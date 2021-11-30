import dotenv from "dotenv";
import path from "path";

if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: path.join(__dirname, "../.env.production") });
} else if (process.env.NODE_ENV === "development") {
  dotenv.config({ path: path.join(__dirname, "../.env.development") });
} else {
  throw new Error(`process.env.NODE_ENV is no set!`);
}

export default {
  port: process.env.PORT,
  DATA_URI: {
    imageClient: process.env.IMAGE_CLIENT_URI,
    vlingClient: process.env.VLING_CLIENT_URI,
  },
  awsEnv: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SCERET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    logGroup: process.env.AWS_CLOUDWATCH_GROUP_NAME,
  },
};
