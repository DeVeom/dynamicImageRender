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
      <g>
        <g>
          <rect
            className={style.competingChannelAvg}
            x="16"
            y="222"
            rx="5"
            ry="5"
          ></rect>
          <text className={style.competingChannelAvgText} x="315" y="236">
            경쟁 채널 평균
          </text>
        </g>
        <GraphInfo
          dailyViewCountSummary={dailyViewCountSummary}
          videoViewCountSummary={videoViewCountSummary}
          activePercentSummary={activePercentSummary}
          favorablePercentSummary={favorablePercentSummary}
          summaryVerticalPoint={summaryVerticalPoint}
          summaryHeight={summaryHeight}
          summaryTextFinalPosition={summaryTextFinalPosition}
        />
      </g>
    </g>
  );
}

export default PerformanceReport;
