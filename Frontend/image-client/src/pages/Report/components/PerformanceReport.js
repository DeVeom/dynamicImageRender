import React from 'react';
import GraphInfo from './GraphInfo';
import style from './PerformanceReport.module.css';
import TextInfo from './TextInfo';

const PerformanceReport = ({
  dailyViewCount,
  averageVideoViewCount,
  favorablePercent,
  activePercent,
}) => {
  return (
    <div className={style.performanceReport}>
      <div className={style.reportTitle}>
        <p>Performance 요약</p>
      </div>
      <div className={style.reportContent}>
        <TextInfo
          dailyViewCount={dailyViewCount}
          averageVideoViewCount={averageVideoViewCount}
          favorablePercent={favorablePercent}
          activePercent={activePercent}
        />
        <GraphInfo />
      </div>
    </div>
  );
};

export default PerformanceReport;
