import React from 'react';
import { useQuery, gql } from '@apollo/client';
import style from './Detail.module.css';
import Banner from './components/Banner';
import Profile from './components/Profile';
import AnalysisMenu from './components/AnalysisMenu';
import SvgReport from '../../components/SVGReport/SvgReport';

const Detail = () => {
  // 8코기 id : UCenG5DES1t6SYGrgzGNzWzQ
  // BLACKPINK id : UCOmHUn--16B90oW2L6FRR3A
  // 빠니보틀 id : UCNhofiqfw5nl-NeDJkXtPvw
  // 꿈꾸는 집 id : UClqOEoJ2wnJA5jAbNul3mXA
  // 꼬마자연인 id : UCfqR11mGVGxAMJzTBuhUHoQ

  const GET_DATA = gql`
    query {
      getChannelData(id: "UCOmHUn--16B90oW2L6FRR3A") {
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
      <AnalysisMenu />
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
    </section>
  );
};

export default Detail;
