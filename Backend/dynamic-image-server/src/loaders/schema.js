import { gql } from 'apollo-server-express';

export default gql`
  type Query {
    info: String!
  }

  type OgImage {
    message: String!
    imageUrl: String!
  }

  enum LayoutType {
    SMALL
    MID
    LARGE
  }

  type Mutation {
    generateOgImage(channelId: ID!, layoutType: String): OgImage
  }
`;
