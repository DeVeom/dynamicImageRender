import {
  ApolloClient,
  gql,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import fetch from "cross-fetch";
import config from "../config/environment/index";

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

    const data = await client.mutate({ mutation: GET_IMAGE_URL });
    return data;
  } catch (err) {
    console.error(err);
  }
};
