import { gql } from 'apollo-server-express';

export default gql`
  type Query {
    info: String!
  }

  type Screenshot {
    message: String!
    imageUrl: String!
  }

  enum LayoutType {
    SMALL
    MID
    LARGE
  }

  type Mutation {
    generateScreenshot(channelId: ID!, layoutType: String): Screenshot
  }
`;
