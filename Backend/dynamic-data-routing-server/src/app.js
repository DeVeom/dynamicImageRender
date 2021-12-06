import express from "express";
import { ApolloServer } from "apollo-server-express";
import config from "../config/index";
import { logger } from "../config/winston";
import { typeDefs } from "../graphql/typeDefs";
import { resolvers } from "../graphql/resolvers";
import cors from "cors";

const app = express();

const { port } = config;

const serverStart = async () => {
  app.use(express.json());

  app.use(cors());

  // app.use(function (err, req, res, next) {
  //   // set locals, only providing error in development
  //   res.locals.message = err.message;
  //   res.locals.error = req.app.get("env") === "development" ? err : {};

  //   // add this line to include winston logging
  //   winston.error(
  //     `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${
  //       req.method
  //     } - ${req.ip}`
  //   );

  //   // render the error page
  //   res.status(err.status || 500);
  //   res.render("error");
  // });

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
