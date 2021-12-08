import express from "express";
import { ApolloServer } from "apollo-server-express";
import config from "../config/index";
import router from "./routes";
import { logger } from "../config/winston";
import { typeDefs } from "../graphql/typeDefs";
import { resolvers } from "../graphql/resolvers";
import cors from "cors";

const app = express();

const { port } = config;

const serverStart = async () => {
  app.use(express.json());

  app.use(cors());
  app.use(router);

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app });

  app.listen(port, () => {
    try {
      logger.info(
        `data routing server localhost:${port}${apolloServer.graphqlPath}`
      );
    } catch (error) {
      logger.error(error);
    }
  });
};

serverStart();
