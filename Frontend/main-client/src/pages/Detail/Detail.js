import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router';
import { useMediaQuery } from 'react-responsive';
import style from './Detail.module.css';
import Banner from './components/Banner';
import Profile from './components/Profile';
import AnalysisMenu from './components/AnalysisMenu';
import SvgReportForPc from '../../components/SVGReportForPc/SvgReportForPc';
import SvgReportForTablet from '../../components/SVGReportForTablet/SvgReportForTablet';
import SvgReportForMobile from '../../components/SVGReportForMobile/SvgReportForMobile';

const Detail = () => {
  const isPc = useMediaQuery({
    query: '(min-width:1051px)',
  });
  const isTablet = useMediaQuery({
    query: '(min-width:768px) and (max-width:1050px)',
  });
  const isMobile = useMediaQuery({
    query: '(max-width:767px)',
  });

  const params = useParams();
  const channelId = params.id;
  const GET_DATA = gql`
    query {
      getChannelData(id: "${channelId}") {
        channelForGuest
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_DATA);

  if (loading) return <p>loading...</p>;
  if (error) return <p style={{ paddingTop: '100px' }}>Error T T</p>;

  const {
    banner,
    title,
    thumbnails,
    description,
    category,
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
  } = data.getChannelData.channelForGuest.data.channelForGuest;

  return (
    <section className={style.detailContainer}>
      {isPc && (
        <div className={style.pcVersionContainer}>
          <Banner banner={banner} title={title} />
          <Profile
            thumbnails={thumbnails}
            title={title}
            description={description}
            category={category}
          />
          <AnalysisMenu channelId={channelId} />
          <div className={style.svgReportContainer}>
            <SvgReportForPc
              dailyAverageViewCount={dailyAverageViewCount}
              averageVideoViewCount={averageVideoViewCount}
              favorablePercent={favorablePercent}
              activePercent={activePercent}
              dailyViewCountSummary={dailyViewCountSummary}
              videoViewCountSummary={videoViewCountSummary}
              activePercentSummary={activePercentSummary}
              favorablePercentSummary={favorablePercentSummary}
              subscriberCountRank={subscriberCountRank}
              subscriberCountRankPercent={subscriberCountRankPercent}
              expectedRevenueRank={expectedRevenueRank}
              expectedRevenueRankPercent={expectedRevenueRankPercent}
              subscriberCount={subscriberCount}
              publishedAt={publishedAt}
              videoTotalCount={videoTotalCount}
            />
          </div>
        </div>
      )}
      {isTablet && (
        <div className={style.pcVersionContainer}>
          <Banner banner={banner} title={title} />
          <Profile
            thumbnails={thumbnails}
            title={title}
            description={description}
            category={category}
          />
          <AnalysisMenu channelId={channelId} />
          <div className={style.svgReportContainer}>
            <SvgReportForTablet
              dailyAverageViewCount={dailyAverageViewCount}
              averageVideoViewCount={averageVideoViewCount}
              favorablePercent={favorablePercent}
              activePercent={activePercent}
              dailyViewCountSummary={dailyViewCountSummary}
              videoViewCountSummary={videoViewCountSummary}
              activePercentSummary={activePercentSummary}
              favorablePercentSummary={favorablePercentSummary}
              subscriberCountRank={subscriberCountRank}
              subscriberCountRankPercent={subscriberCountRankPercent}
              expectedRevenueRank={expectedRevenueRank}
              expectedRevenueRankPercent={expectedRevenueRankPercent}
              subscriberCount={subscriberCount}
              publishedAt={publishedAt}
              videoTotalCount={videoTotalCount}
            />
          </div>
        </div>
      )}
      {isMobile && (
        <div className={style.pcVersionContainer}>
          <Banner banner={banner} title={title} />
          <Profile
            thumbnails={thumbnails}
            title={title}
            description={description}
            category={category}
          />
          <AnalysisMenu channelId={channelId} />
          <div className={style.svgReportContainer}>
            <SvgReportForMobile
              dailyAverageViewCount={dailyAverageViewCount}
              averageVideoViewCount={averageVideoViewCount}
              favorablePercent={favorablePercent}
              activePercent={activePercent}
              dailyViewCountSummary={dailyViewCountSummary}
              videoViewCountSummary={videoViewCountSummary}
              activePercentSummary={activePercentSummary}
              favorablePercentSummary={favorablePercentSummary}
              subscriberCountRank={subscriberCountRank}
              subscriberCountRankPercent={subscriberCountRankPercent}
              expectedRevenueRank={expectedRevenueRank}
              expectedRevenueRankPercent={expectedRevenueRankPercent}
              subscriberCount={subscriberCount}
              publishedAt={publishedAt}
              videoTotalCount={videoTotalCount}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Detail;
