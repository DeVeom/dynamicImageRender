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
};
