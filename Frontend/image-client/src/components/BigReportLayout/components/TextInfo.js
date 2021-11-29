import React from 'react';
import style from './TextInfo.module.css';

function TextInfo({
  dailyAverageViewCount,
  averageVideoViewCount,
  activePercent,
  favorablePercent,
  getRoundNumber,
}) {
  return (
    <g>
      <g>
        <text className={style.textInfoList} x="90" y="100">
          일일 조회수
        </text>
        <text className={style.textInfoName} x="90" y="130">
          {getRoundNumber(dailyAverageViewCount)}
        </text>
      </g>
      <g>
        <text className={style.textInfoList} x="240" y="100">
          영상별 평균 조회수
        </text>
        <text className={style.textInfoName} x="240" y="130">
          {getRoundNumber(averageVideoViewCount)}
        </text>
      </g>
      <g>
        <text className={style.textInfoList} x="390" y="100">
          활성도
        </text>
        <text className={style.textInfoName} x="390" y="130">
          {activePercent}%
        </text>
      </g>
      <g>
        <text className={style.textInfoList} x="540" y="100">
          호감도
        </text>
        <text className={style.textInfoName} x="540" y="130">
          {favorablePercent}%
        </text>
      </g>
    </g>
  );
}

export default TextInfo;
