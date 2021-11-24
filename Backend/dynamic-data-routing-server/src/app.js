import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import GraphQLJSON from "graphql-type-json";
import dotenv from "dotenv";
import { getChannelForGuest, getChannelsForList } from "./apolloClient";
import cors from "cors";

dotenv.config();

const port = process.env.PORT;
const app = express();

const typeDefs = gql`
  scalar JSON

  type Query {
    getChannelData(id: ID!): ChannelForGuest
    getChannelsForList(keyword: String!): ChannelsForList
  }

  type ChannelForGuest {
    channelForGuest: JSON
  }

  type ChannelsForList {
    channelsForList: [JSON]
  }
`;

const resolvers = {
  JSON: GraphQLJSON,
  Query: {
    async getChannelData(_, { id }) {
      const channelData = await getChannelForGuest(id);
      const data = { channelForGuest: channelData };
      return data;
    },
    async getChannelsForList(_, { keyword }) {
      const channelListData = await getChannelsForList(keyword);
      const data = { channelsForList: channelListData };
      return data;
    },
  },
};

const serverStart = async () => {
  app.use(express.json());
  app.use(cors());

  const apolloServer = new ApolloServer({ typeDefs, resolvers });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app });

  app.listen(port, () => {
    console.log(`server localhost:${port}${apolloServer.graphqlPath}`);
  });
};

serverStart();
