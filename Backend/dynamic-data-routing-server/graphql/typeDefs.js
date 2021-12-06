import { gql } from "apollo-server-express";

export const typeDefs = gql`
  scalar JSON

  type Query {
    getChannelData(id: ID!): ChannelForGuest
    getChannelsForList(
      keyword: String!
      from: Int!
      size: Int!
      order: String!
    ): ChannelsForList
  }

  type Mutation {
    generateScreenshot(channelId: ID!, layoutType: String): String
  }

  type ChannelForGuest {
    channelForGuest: JSON
  }

  type ChannelsForList {
    channelsForList: [JSON]
  }
`;
