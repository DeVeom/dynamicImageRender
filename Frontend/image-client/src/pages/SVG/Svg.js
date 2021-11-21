import React from 'react';
import style from './Svg.module.css';
import { useQuery, gql } from '@apollo/client';

const Svg = () => {
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

  const roundDailyViewCount =
    dailyViewCount >= 10000
      ? (dailyViewCount / 10000).toFixed(1)
      : dailyViewCount;

  const roundAverageVideoViewCount =
    averageVideoViewCount >= 10000
      ? (averageVideoViewCount / 10000).toFixed(1)
      : averageVideoViewCount;

  return (
    <svg className={style.reportContainer} height="349" width="1050">
      <g className={style.performanceReport}>
        <text className={style.performanceReportTitle} x="0" y="30">
          Performance 요약
        </text>
        <g>
          <g>
            <text className={style.textInfoList} x="90" y="100">
              일일 조회수
            </text>
            <text className={style.textInfoName} x="90" y="130">
              {roundDailyViewCount}만
            </text>
          </g>
          <g>
            <text className={style.textInfoList} x="240" y="100">
              영상별 평균 조회수
            </text>
            <text className={style.textInfoName} x="240" y="130">
              {roundAverageVideoViewCount}만
            </text>
          </g>
          <g>
            <text className={style.textInfoList} x="390" y="100">
              활성도
            </text>
            <text className={style.textInfoName} x="390" y="130">
              {activePercent}%
            </text>
          </g>
          <g>
            <text className={style.textInfoList} x="540" y="100">
              호감도
            </text>
            <text className={style.textInfoName} x="540" y="130">
              {favorablePercent}%
            </text>
          </g>
        </g>
      </g>
      <line
        x1="629"
        x2="629"
        y1="20"
        y2="329"
        stroke="rgba(1, 1, 1, 0.2)"
      ></line>
      <g className={style.detailReport}></g>
    </svg>
  );
};

export default Svg;
