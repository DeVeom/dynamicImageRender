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
        <text className={style.textInfoList} x="80" y="250">
          일일 조회수
        </text>
        <text className={style.textInfoName} x="80" y="274">
          {getRoundNumber(dailyAverageViewCount)}
        </text>
      </g>
      <g>
        <text className={style.textInfoList} x="190" y="250">
          영상별 평균 조회수
        </text>
        <text className={style.textInfoName} x="190" y="274">
          {getRoundNumber(averageVideoViewCount)}
        </text>
      </g>
      <g>
        <text className={style.textInfoList} x="300" y="250">
          활성도
        </text>
        <text className={style.textInfoName} x="300" y="274">
          {activePercent}%
        </text>
      </g>
      <g>
        <text className={style.textInfoList} x="410" y="250">
          호감도
        </text>
        <text className={style.textInfoName} x="410" y="274">
          {favorablePercent}%
        </text>
      </g>
    </g>
  );
};

export default TextInfo;
