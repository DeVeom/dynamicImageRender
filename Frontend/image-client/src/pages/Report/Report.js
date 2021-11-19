import React, { useState, useEffect } from 'react';
import style from './Report.module.css';
import { useQuery, gql } from '@apollo/client';
import PerformanceReport from './components/PerformanceReport';
import DetailReport from './components/DetailReport';

const Report = () => {
  const [reportData, setReportData] = useState({});

  const GET_DATA = gql`
    query {
      channelForGuest(id: "UCenG5DES1t6SYGrgzGNzWzQ") {
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
    }
  `;

  const { loading, error, data } = useQuery(GET_DATA);

  if (loading) return <p>loading...</p>;
  if (error) return <p>Error T T</p>;

  const {
    dailyViewCount,
    averageVideoViewCount,
    favorablePercent,
    activePercent,
  } = data.channelForGuest;

  return (
    <div className={style.reportContainer}>
      {/* <svg className={style.loadingSvg}>
        <circle
          cx="10%"
          cy="50%"
          r="25"
          className={style.loadingCircle}
        ></circle>
      </svg> */}
      <PerformanceReport
        dailyViewCount={dailyViewCount}
        averageVideoViewCount={averageVideoViewCount}
        favorablePercent={favorablePercent}
        activePercent={activePercent}
      />
      <DetailReport />
    </div>
  );
};

export default Report;
