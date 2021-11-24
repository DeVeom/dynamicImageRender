import express from "express";
import { ApolloServer } from "apollo-server-express";
import { port } from "../config/environment/index";
import { typeDefs } from "../graphql/typeDefs";
import { resolvers } from "../graphql/resolvers";
import cors from "cors";

const app = express();

const serverStart = async () => {
  app.use(express.json());

  const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
  };

  app.use(cors(corsOptions));

  const apolloServer = new ApolloServer({ typeDefs, resolvers });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app });

  app.listen(port, () => {
    console.log(
      `data routing server localhost:${port}${apolloServer.graphqlPath}`
    );
  });
};

serverStart();
