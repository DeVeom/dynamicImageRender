import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router';
import style from './Detail.module.css';
import Banner from './components/Banner';
import Profile from './components/Profile';
import AnalysisMenu from './components/AnalysisMenu';
import SvgReport from '../../components/SVGReport/SvgReport';

const Detail = () => {
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
      <Banner banner={banner} title={title} />
      <Profile
        thumbnails={thumbnails}
        title={title}
        description={description}
        category={category}
      />
      <AnalysisMenu channelId={channelId} />
      <div className={style.svgReportContainer}>
        <SvgReport
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
    </section>
  );
};

export default Detail;
