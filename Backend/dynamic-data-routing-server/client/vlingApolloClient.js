import {
  ApolloClient,
  gql,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import fetch from "cross-fetch";
import config from "../config/index";
import { logger } from "../config/winston";

const { DATA_URI } = config;

const httpLink = createHttpLink({
  uri: `${DATA_URI.vlingClient}`,
  fetch: fetch,
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export const getChannelForGuest = async (id) => {
  try {
    const QUERY = gql`
    query {
      channelForGuest(id: "${id}") {
        title                  
        publishedAt                    
        description                    
        banner                    
        activePercent                    
        favorablePercent                    
        subscriberCount                    
        subscriberCountRank                    
        subscriberCountRankPercent                    
        expectedRevenueRank                    
        expectedRevenueRankPercent     
        thumbnails                                      
        category                    
        dailyViewCountSummary                    
        videoViewCountSummary                    
        favorablePercentSummary                    
        activePercentSummary                                        
        averageAdVideoViewCount                    
        videoTotalCount                    
      }
    }`;

    const data = await client.query({ query: QUERY });

    return data;
  } catch (err) {
    logger.error(err);
  }
};

export const getChannelsForList = async (keyword, from, size) => {
  try {
    const GET_LIST = gql`
    query {
      channelsForList(
      keyword: "${keyword}",
      userId:"",
      from: ${from},
      size: ${size},
      minSubscriber:0,
      maxSubscriber:200000000000,
      minViews:0,
      maxViews:200000000000,
      order: "subscriberCount",
      minVideoViews:0,
      maxVideoViews:200000000000,
      minAdPrice:0,
      maxAdPrice:200000000000,
      categories:[""],
      nation:"KR",
      )}`;

    const result = await client.query({ query: GET_LIST });
    const {
      data: { channelsForList },
    } = result;
    return channelsForList;
  } catch (err) {
    logger.error(err);
  }
};
