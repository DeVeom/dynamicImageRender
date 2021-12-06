import React from 'react';
import style from './DetailReport.module.css';
import DetailTextInfo from './DetailTextInfo';

const DetailReport = ({
  subscriberCount,
  publishedAt,
  videoTotalCount,
  getRoundNumber,
  getGrade,
  getSubscriberGradePosition,
  getPublishDate,
}) => {
  return (
    <g className={style.detailReport}>
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
};

export default DetailReport;
