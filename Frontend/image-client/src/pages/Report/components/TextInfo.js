import React from 'react';
import style from './TextInfo.module.css';

const TextInfo = ({
  dailyViewCount,
  averageVideoViewCount,
  favorablePercent,
  activePercent,
}) => {
  const roundDailyViewCount =
    dailyViewCount >= 10000
      ? (dailyViewCount / 10000).toFixed(1)
      : dailyViewCount;

  const roundAverageVideoViewCount =
    averageVideoViewCount >= 10000
      ? (averageVideoViewCount / 10000).toFixed(1)
      : averageVideoViewCount;

  return (
    <ul className={style.textInfo}>
      <li className={style.textInfoList}>
        <p className={style.textInfoName}>일일 조회수</p>
        <p>{roundDailyViewCount}만</p>
      </li>
      <li className={style.textInfoList}>
        <p className={style.textInfoName}>영상별 평균 조회수</p>
        <p>{roundAverageVideoViewCount}만</p>
      </li>
      <li className={style.textInfoList}>
        <p className={style.textInfoName}>활성도</p>
        <p>{activePercent}%</p>
      </li>
      <li className={style.textInfoList}>
        <p className={style.textInfoName}>호감도</p>
        <p>{favorablePercent}%</p>
      </li>
    </ul>
  );
};

export default TextInfo;
