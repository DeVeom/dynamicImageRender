import React from 'react';
import style from './TextInfo.module.css';

const TextInfo = ({
  dailyAverageViewCount,
  averageVideoViewCount,
  activePercent,
  favorablePercent,
  getRoundNumber,
}) => {
  return (
    <g>
      <g>
        <text className={style.textInfoList} x="120" y="100">
          일일 조회수
        </text>
        <text className={style.textInfoName} x="120" y="130">
          {getRoundNumber(dailyAverageViewCount)}
        </text>
      </g>
      <g>
        <text className={style.textInfoList} x="296" y="100">
          영상별 평균 조회수
        </text>
        <text className={style.textInfoName} x="296" y="130">
          {getRoundNumber(averageVideoViewCount)}
        </text>
      </g>
      <g>
        <text className={style.textInfoList} x="472" y="100">
          활성도
        </text>
        <text className={style.textInfoName} x="472" y="130">
          {activePercent}%
        </text>
      </g>
      <g>
        <text className={style.textInfoList} x="648" y="100">
          호감도
        </text>
        <text className={style.textInfoName} x="648" y="130">
          {favorablePercent}%
        </text>
      </g>
    </g>
  );
};

export default TextInfo;
