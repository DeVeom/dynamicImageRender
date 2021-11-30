import React from 'react';
import style from './PerformanceReport.module.css';
import TextInfo from './TextInfo';
import GraphInfo from './GraphInfo';

function PerformanceReport({
  dailyAverageViewCount,
  averageVideoViewCount,
  activePercent,
  favorablePercent,
  dailyViewCountSummary,
  videoViewCountSummary,
  activePercentSummary,
  favorablePercentSummary,
  getRoundNumber,
  summaryVerticalPoint,
  summaryHeight,
  summaryTextStartPosition,
  summaryTextFinalPosition,
}) {
  return (
    <g className={style.performanceReport}>
      <text className={style.performanceReportTitle} x="0" y="30">
        Performance 요약
      </text>
      <TextInfo
        dailyAverageViewCount={dailyAverageViewCount}
        averageVideoViewCount={averageVideoViewCount}
        activePercent={activePercent}
        favorablePercent={favorablePercent}
        getRoundNumber={getRoundNumber}
      />
      <GraphInfo
        dailyViewCountSummary={dailyViewCountSummary}
        videoViewCountSummary={videoViewCountSummary}
        activePercentSummary={activePercentSummary}
        favorablePercentSummary={favorablePercentSummary}
        summaryVerticalPoint={summaryVerticalPoint}
        summaryHeight={summaryHeight}
        summaryTextStartPosition={summaryTextStartPosition}
        summaryTextFinalPosition={summaryTextFinalPosition}
      />
    </g>
  );
}

export default PerformanceReport;
