import React from 'react';
import style from './DetailReport.module.css';
import Rank from './Rank';
import DetailTextInfo from './DetailTextInfo';

function DetailReport({
  subscriberCountRank,
  subscriberCountRankPercent,
  expectedRevenueRank,
  expectedRevenueRankPercent,
  subscriberCount,
  publishedAt,
  videoTotalCount,
  getRoundNumber,
  getGrade,
  getSubscriberGradePosition,
  getPublishDate,
}) {
  return (
    <g className={style.detailReport}>
      <Rank
        subscriberCountRank={subscriberCountRank}
        subscriberCountRankPercent={subscriberCountRankPercent}
        expectedRevenueRank={expectedRevenueRank}
        expectedRevenueRankPercent={expectedRevenueRankPercent}
      />
      <DetailTextInfo
        subscriberCount={subscriberCount}
        publishedAt={publishedAt}
        videoTotalCount={videoTotalCount}
        getRoundNumber={getRoundNumber}
        getGrade={getGrade}
        getSubscriberGradePosition={getSubscriberGradePosition}
        getPublishDate={getPublishDate}
      />
    </g>
  );
}

export default DetailReport;
