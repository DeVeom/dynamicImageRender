import { createTestClient } from "apollo-server-testing";
import { ApolloServer, gql } from "apollo-server-express";
import { typeDefs } from "../graphql/typeDefs";
import { resolvers } from "../graphql/resolvers";

const app = express();

const app = new ApolloServer({
  typeDefs,
  resolvers,
});
