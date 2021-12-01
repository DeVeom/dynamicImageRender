import React from 'react';
import style from './SvgReportForMobile.module.css';
import PerformanceReport from './components/PerformanceReport';
import DetailReport from './components/DetailReport';

const SvgReportForMobile = ({
  dailyAverageViewCount,
  averageVideoViewCount,
  favorablePercent,
  activePercent,
  dailyViewCountSummary,
  videoViewCountSummary,
  activePercentSummary,
  favorablePercentSummary,
  subscriberCount,
  publishedAt,
  videoTotalCount,
}) => {
  const getRoundNumber = data => {
    const roundNumber =
      data >= 10000 ? parseFloat((data / 10000).toFixed(1)) + '만' : data;
    return roundNumber;
  };

  const summaryVerticalPoint = data => (data >= 0 ? 371 : 397);

  const summaryHeight = data =>
    data >= 0
      ? 371 - Math.min((data / 100) * 58, 58)
      : 397 + Math.min((Math.abs(data) / 100) * 80, 80);

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
      position = 381;
    } else if (getGrade(data).kor.length === 3) {
      position = 364;
    } else if (getGrade(data).kor.length === 4) {
      position = 347;
    } else if (getGrade(data).kor.length === 5) {
      position = 330;
    }

    return position;
  };

  return (
    <div className={style.svgReportContainer}>
      <div className={style.containerForSnapShot}>
        <svg className={style.reportContainer}>
          <PerformanceReport
            dailyAverageViewCount={dailyAverageViewCount}
            averageVideoViewCount={averageVideoViewCount}
            favorablePercent={favorablePercent}
            activePercent={activePercent}
            dailyViewCountSummary={dailyViewCountSummary}
            videoViewCountSummary={videoViewCountSummary}
            activePercentSummary={activePercentSummary}
            favorablePercentSummary={favorablePercentSummary}
            getRoundNumber={getRoundNumber}
            summaryVerticalPoint={summaryVerticalPoint}
            summaryHeight={summaryHeight}
            summaryTextStartPosition={summaryTextStartPosition}
            summaryTextFinalPosition={summaryTextFinalPosition}
          />
          <line
            x1="0"
            x2="490"
            y1="169"
            y2="169"
            stroke="rgba(1, 1, 1, 0.2)"
          ></line>
          <DetailReport
            subscriberCount={subscriberCount}
            publishedAt={publishedAt}
            videoTotalCount={videoTotalCount}
            getRoundNumber={getRoundNumber}
            getGrade={getGrade}
            getPublishDate={getPublishDate}
            getSubscriberGradePosition={getSubscriberGradePosition}
          />
        </svg>
      </div>
    </div>
  );
};

export default SvgReportForMobile;
