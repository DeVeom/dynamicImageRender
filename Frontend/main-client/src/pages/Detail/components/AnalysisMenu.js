import React from 'react';
import style from './AnalysisMenu.module.css';

const AnalysisMenu = () => {
  return (
    <div className={style.analysisMenu}>
      <p className={style.analysisMenuText}>채널 분석</p>
      <p className={style.analysisMenuText}>영상 분석</p>
      <p className={style.analysisMenuText}>시청자 분석</p>
      <p className={style.analysisMenuText}>광고 단가</p>
      <p className={style.analysisMenuText}>관련 채널 분석</p>
    </div>
  );
};

export default AnalysisMenu;
