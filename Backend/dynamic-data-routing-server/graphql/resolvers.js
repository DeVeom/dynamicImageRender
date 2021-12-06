import {
  getChannelForGuest,
  getChannelsForList,
} from "../client/vlingApolloClient";
import { generateScreenshot } from "../client/imageApolloClient";
import GraphQLJSON from "graphql-type-json";

export const resolvers = {
  JSON: GraphQLJSON,
  Query: {
    async getChannelData(_, { id }) {
      const channelData = await getChannelForGuest(id);
      const data = { channelForGuest: channelData };
      return data;
    },
    async getChannelsForList(_, { keyword, from, size, order }) {
      const channelListData = await getChannelsForList(
        keyword,
        from,
        size,
        order
      );
      const data = { channelsForList: channelListData };
      return data;
    },
  },
  Mutation: {
    async generateScreenshot(_, { channelId, layoutType }) {
      const imageData = await generateScreenshot(channelId, layoutType);
      const {
        data: {
          generateScreenshot: { imageUrl },
        },
      } = imageData;
      return imageUrl;
    },
  },
};
