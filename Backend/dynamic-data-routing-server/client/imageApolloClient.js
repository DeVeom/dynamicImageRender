import {
  ApolloClient,
  gql,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import fetch from "cross-fetch";
import config from "../config/index";
import { logger } from "../config/winston";
import { logReqInfo, logResInfo } from "../src/middlewares/httpLogger";

const { DATA_URI } = config;

const httpLink = createHttpLink({
  uri: `${DATA_URI.imageClient}`,
  fetch: fetch,
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export const generateScreenshot = async (channelId, layoutType) => {
  try {
    const GET_IMAGE_URL = gql`
    mutation {
      generateScreenshot(channelId: "${channelId}", layoutType: "${layoutType}") {
        message
        imageUrl
      }
    }`;
    logReqInfo;

    const data = await client.mutate({ mutation: GET_IMAGE_URL });
    return data;
  } catch (err) {
    logger.error(err);
  }
  logResInfo;
};
