import {
  ApolloClient,
  gql,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import fetch from "cross-fetch";
import config from "../config/environment/index";

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
        channelId      
        title                  
        priceHidden                    
        publishedAt                    
        isCustomAdPrice                    
        description                    
        banner                    
        activePercent                    
        favorablePercent                    
        subscriberCount                    
        subscriberCountRank                    
        subscriberCountRankPercent                    
        expectedRevenueRank                    
        expectedRevenueRankPercent                    
        viewCount                    
        dailyAverageViewCount                    
        dailyViewCount                    
        averageVideoViewCount                    
        cpv                    
        cpvBrand                    
        thumbnails                    
        mails                    
        mcn                    
        nations                    
        minAdvertisingUnitPrice                     
        maxAdvertisingUnitPrice                      
        advertisingUnitPrice                    
        subscriberChange                    
        replyRatio                    
        category                    
        dailyViewCountSummary                    
        videoViewCountSummary                    
        favorablePercentSummary                    
        activePercentSummary                                        
        isFavorite                    
        interestTags                    
        interestChannels                    
        favorablePercentAboutNormalVideo                    
        favorablePercentAboutAdVideo                    
        averageNormalVideoViewCount                    
        averageAdVideoViewCount                    
        averageCommentCountAboutNormalVideo                    
        averageCommentCountAboutAdVideo                    
        averagePredictionVideoViewCount              
        links {                        
          name                        
          href                    
        }                    
        gender {                        
          M                        
          F                        
          N                    
        }                    
        language {                        
          lang                        
          count                    
        }                    
        wordCount {                        
          word                        
          count                    
        }                    
        stat {                        
          searchDate                                                
          dailyViewCount                        
          subscriberCount                        
          videoCount                        
          favorablePercent                        
          activePercent                    
        }                    
        video {                        
          videoId                        
          channelId                        
          publishedAt                        
          title                        
          description                        
          thumbnails                        
          viewCount                        
          likeCount                        
          dislikeCount                        
          commentCount                        
          isAd                    
        }                    
        age {                        
          min                        
          max                        
          percent                    
        }                    
        similarChannels {                        
          channelId                        
          title                        
          description                        
          thumbnails                        
          dailyViewCount                        
          subscriberCount                        
          isFavorite                    
        }                    
        competingChannels {                      
          title                      
          thumbnails                      
          dailyViewCount                      
          subscriberCount                      
          averageVideoViewCount                    
        }                    
        commentEmojis                    
        commentPubInfo                    
        lackOfChannelData                    
        averageVideoAnalyticsCommentCount                    
        averageVideoAnalyticsLikeCount                    
        averageVideoAnalyticsViewCount                    
        averageVideoAnalyticsDislikeCount                    
        videoStats                    
        videoCount                    
        videoYearCount                    
        videoMonthCount                   
        videoTotalCount                    
        adTagList                 
      }
    }`;

    const data = await client.query({ query: QUERY });

    return data;
  } catch (err) {
    console.error(err);
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
      )
    }`;

    const result = await client.query({ query: GET_LIST });
    const {
      data: { channelsForList },
    } = result;
    return channelsForList;
  } catch (err) {
    console.error(err);
  }
};
