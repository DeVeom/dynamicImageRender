import React from 'react';
import style from './Report.module.css';
import { useQuery, gql } from '@apollo/client';

const Report = () => {
  // 8코기 id : UCenG5DES1t6SYGrgzGNzWzQ
  // BLACKPINK id : UCOmHUn--16B90oW2L6FRR3A
  // 빠니보틀 id : UCNhofiqfw5nl-NeDJkXtPvw
  // 꿈꾸는 집 id : UClqOEoJ2wnJA5jAbNul3mXA
  // 꼬마자연인 id : UCfqR11mGVGxAMJzTBuhUHoQ

  const GET_DATA = gql`
    query {
      channelForGuest(id: "UCOmHUn--16B90oW2L6FRR3A") {
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
    dailyAverageViewCount,
    averageVideoViewCount,
    favorablePercent,
    activePercent,
    dailyViewCountSummary,
    videoViewCountSummary,
    activePercentSummary,
    favorablePercentSummary,
    subscriberCountRank,
    subscriberCountRankPercent,
    expectedRevenueRank,
    expectedRevenueRankPercent,
    subscriberCount,
    publishedAt,
    videoTotalCount,
  } = data.channelForGuest;

  const getRoundNumber = data => {
    const roundNumber =
      data >= 10000 ? parseFloat((data / 10000).toFixed(1)) + '만' : data;
    return roundNumber;
  };

  const summaryVerticalPoint = data => (data >= 0 ? 222 : 248);

  const summaryHeight = data =>
    data >= 0
      ? 222 - Math.min((data / 100) * 58, 58)
      : 248 + Math.min((Math.abs(data) / 100) * 80, 80);

  const summaryTextStartPosition = data =>
    data >= 0
      ? summaryVerticalPoint(data) - 12
      : summaryVerticalPoint(data) + 15;

  const summaryTextFinalPosition = data =>
    data >= 0 ? summaryHeight(data) - 12 : summaryHeight(data) + 15;

  const getGrade = data => {
    let grade;
    if (data >= 10000000) grade = { kor: '다이아', eng: 'Mega' };
    else if (data >= 1000000 && data < 10000000)
      grade = { kor: '골드', eng: 'Mega' };
    else if (data >= 100000 && data < 1000000)
      grade = { kor: '실버', eng: 'Macro' };
    else if (data >= 10000 && data < 100000)
      grade = { kor: '브론즈', eng: 'Macro' };
    else if (data >= 1000 && data < 10000)
      grade = { kor: '오팔', eng: 'Micro' };
    else grade = { kor: '그라파이트', eng: 'Nano' };
    return grade;
  };

  const getPublishDate = data => {
    return data.slice(0, 10);
  };

  const getSubscriberGradePosition = data => {
    let position;
    if (getGrade(data).kor.length === 2) {
      position = 957;
    } else if (getGrade(data).kor.length === 3) {
      position = 938;
    } else if (getGrade(data).kor.length === 4) {
      position = 919;
    } else if (getGrade(data).kor.length === 5) {
      position = 900;
    }

    return position;
  };

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
              {getRoundNumber(dailyAverageViewCount)}
            </text>
          </g>
          <g>
            <text className={style.textInfoList} x="240" y="100">
              영상별 평균 조회수
            </text>
            <text className={style.textInfoName} x="240" y="130">
              {getRoundNumber(averageVideoViewCount)}
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
        <g>
          <g>
            <rect
              class={style.competingChannelAvg}
              x="16"
              y="222"
              rx="5"
              ry="5"
            ></rect>
            <text class={style.competingChannelAvgText} x="315" y="236">
              경쟁 채널 평균
            </text>
          </g>
          <g>
            <g>
              {
                <path
                  className={style.channelSummaryGraph}
                  style={
                    dailyViewCountSummary >= 0
                      ? { fill: '#0A9D58', stroke: '#0A9D58' }
                      : { fill: '#DA4437', stroke: '#DA4437' }
                  }
                  d={`M 56 ${summaryVerticalPoint(
                    dailyViewCountSummary
                  )} V ${summaryVerticalPoint(
                    dailyViewCountSummary
                  )} H 126 V ${summaryVerticalPoint(dailyViewCountSummary)}`}
                >
                  <animate
                    attributeName="d"
                    dur="1s"
                    to={`M 56 ${summaryVerticalPoint(
                      dailyViewCountSummary
                    )} V ${summaryHeight(
                      dailyViewCountSummary
                    )} H 126 V ${summaryVerticalPoint(dailyViewCountSummary)}`}
                    fill="freeze"
                    begin="2s"
                  ></animate>
                </path>
              }
              {
                <text
                  className={style.channelSummaryText}
                  style={
                    dailyViewCountSummary >= 0
                      ? { fill: '#0A9D58' }
                      : { fill: '#DA4437' }
                  }
                  x="91"
                  y={`${summaryTextStartPosition(dailyViewCountSummary)}`}
                >
                  {dailyViewCountSummary >= 0
                    ? '+' + dailyViewCountSummary
                    : dailyViewCountSummary}
                  %
                  <animate
                    attributeName="y"
                    dur="1s"
                    to={`${summaryTextFinalPosition(dailyViewCountSummary)}`}
                    fill="freeze"
                    begin="2s"
                  ></animate>
                </text>
              }
            </g>
            <g>
              {
                <path
                  className={style.channelSummaryGraph}
                  style={
                    videoViewCountSummary >= 0
                      ? { fill: '#0A9D58', stroke: '#0A9D58' }
                      : { fill: '#DA4437', stroke: '#DA4437' }
                  }
                  d={`M 205 ${summaryVerticalPoint(
                    videoViewCountSummary
                  )} V ${summaryVerticalPoint(
                    videoViewCountSummary
                  )} H 275 V ${summaryVerticalPoint(videoViewCountSummary)}`}
                >
                  <animate
                    attributeName="d"
                    dur="1s"
                    to={`M 205 ${summaryVerticalPoint(
                      videoViewCountSummary
                    )} V ${summaryHeight(
                      videoViewCountSummary
                    )} H 275 V ${summaryVerticalPoint(videoViewCountSummary)}`}
                    fill="freeze"
                    begin="2s"
                  ></animate>
                </path>
              }
              {
                <text
                  className={style.channelSummaryText}
                  style={
                    videoViewCountSummary >= 0
                      ? { fill: '#0A9D58' }
                      : { fill: '#DA4437' }
                  }
                  x="240"
                  y={`${summaryTextStartPosition(videoViewCountSummary)}`}
                >
                  {videoViewCountSummary >= 0
                    ? '+' + videoViewCountSummary
                    : videoViewCountSummary}
                  %
                  <animate
                    attributeName="y"
                    dur="1s"
                    to={`${summaryTextFinalPosition(videoViewCountSummary)}`}
                    fill="freeze"
                    begin="2s"
                  ></animate>
                </text>
              }
            </g>
            <g>
              {
                <path
                  className={style.channelSummaryGraph}
                  style={
                    activePercentSummary >= 0
                      ? { fill: '#0A9D58', stroke: '#0A9D58' }
                      : { fill: '#DA4437', stroke: '#DA4437' }
                  }
                  d={`M 355 ${summaryVerticalPoint(
                    activePercentSummary
                  )} V ${summaryVerticalPoint(
                    activePercentSummary
                  )} H 425 V ${summaryVerticalPoint(activePercentSummary)}`}
                >
                  <animate
                    attributeName="d"
                    dur="1s"
                    to={`M 355 ${summaryVerticalPoint(
                      activePercentSummary
                    )} V ${summaryHeight(
                      activePercentSummary
                    )} H 425 V ${summaryVerticalPoint(activePercentSummary)}`}
                    fill="freeze"
                    begin="2s"
                  ></animate>
                </path>
              }
              {
                <text
                  className={style.channelSummaryText}
                  style={
                    activePercentSummary >= 0
                      ? { fill: '#0A9D58' }
                      : { fill: '#DA4437' }
                  }
                  x="390"
                  y={`${summaryTextStartPosition(activePercentSummary)}`}
                >
                  {activePercentSummary >= 0
                    ? '+' + activePercentSummary
                    : activePercentSummary}
                  %
                  <animate
                    attributeName="y"
                    dur="1s"
                    to={`${summaryTextFinalPosition(activePercentSummary)}`}
                    fill="freeze"
                    begin="2s"
                  ></animate>
                </text>
              }
            </g>
            <g>
              {
                <path
                  className={style.channelSummaryGraph}
                  style={
                    favorablePercentSummary >= 0
                      ? { fill: '#0A9D58', stroke: '#0A9D58' }
                      : { fill: '#DA4437', stroke: '#DA4437' }
                  }
                  d={`M 505 ${summaryVerticalPoint(
                    favorablePercentSummary
                  )} V ${summaryVerticalPoint(
                    favorablePercentSummary
                  )} H 575 V ${summaryVerticalPoint(favorablePercentSummary)}`}
                >
                  <animate
                    attributeName="d"
                    dur="1s"
                    to={`M 505 ${summaryVerticalPoint(
                      favorablePercentSummary
                    )} V ${summaryHeight(
                      favorablePercentSummary
                    )} H 575 V ${summaryVerticalPoint(
                      favorablePercentSummary
                    )}`}
                    fill="freeze"
                    begin="2s"
                  ></animate>
                </path>
              }
              {
                <text
                  className={style.channelSummaryText}
                  style={
                    favorablePercentSummary >= 0
                      ? { fill: '#0A9D58' }
                      : { fill: '#DA4437' }
                  }
                  x="540"
                  y={`${summaryTextStartPosition(favorablePercentSummary)}`}
                >
                  {favorablePercentSummary >= 0
                    ? '+' + favorablePercentSummary
                    : favorablePercentSummary}
                  %
                  <animate
                    attributeName="y"
                    dur="1s"
                    to={`${summaryTextFinalPosition(favorablePercentSummary)}`}
                    fill="freeze"
                    begin="2s"
                  ></animate>
                </text>
              }
            </g>
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
      <g className={style.detailReport}>
        <g>
          <g>
            <rect
              className={style.rankTextContainer}
              x="686"
              y="55"
              rx="8"
              ry="8"
            ></rect>
            <text x="772" y="81" className={style.rankTitle}>
              유튜브 구독자 순위
            </text>
            <text x="772" y="110" className={style.rankNumber}>
              {subscriberCountRank.toLocaleString('en-US')} th
            </text>
            <text x="772" y="132" className={style.rankTop}>
              [Top {subscriberCountRankPercent}%]
            </text>
          </g>
          <g>
            <rect
              className={style.rankTextContainer}
              x="878"
              y="55"
              rx="8"
              ry="8"
            ></rect>
            <text x="964" y="81" className={style.rankTitle}>
              유튜브 수익 순위
            </text>
            <text x="964" y="110" className={style.rankNumber}>
              {expectedRevenueRank.toLocaleString('en-US')} th
            </text>
            <text x="964" y="132" className={style.rankTop}>
              [Top {expectedRevenueRankPercent}%]
            </text>
          </g>
        </g>
        <g>
          <g>
            <text className={style.detailInfoTitle1} x="686" y="199">
              구독자 등급
            </text>
            <text className={style.detailInfo1} x="1050" y="199">
              <rect width="50" height="24"></rect>
              {getGrade(subscriberCount).kor}
            </text>
            {
              <rect
                x={getSubscriberGradePosition(subscriberCount)}
                y="182"
                rx="10"
                ry="10"
                className={style.subscriberGradeContainer}
              ></rect>
            }
            {
              <text
                x={getSubscriberGradePosition(subscriberCount) + 24}
                y="193"
                className={style.subscriberGrade}
              >
                {getGrade(subscriberCount).eng}
              </text>
            }
          </g>
          <g>
            <text className={style.detailInfoTitle2} x="686" y="235">
              구독자수
            </text>
            <text className={style.detailInfo2} x="1050" y="235">
              {getRoundNumber(subscriberCount)}
            </text>
          </g>
          <g>
            <text className={style.detailInfoTitle3} x="686" y="271">
              채널 가입일
            </text>
            <text className={style.detailInfo3} x="1050" y="271">
              {getPublishDate(publishedAt)}
            </text>
          </g>
          <g>
            <text className={style.detailInfoTitle4} x="686" y="307">
              총 영상수
            </text>
            <text className={style.detailInfo4} x="1050" y="307">
              {videoTotalCount}
            </text>
          </g>
        </g>
      </g>
    </svg>
  );
};

export default Report;
