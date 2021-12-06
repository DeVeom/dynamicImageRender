import React from 'react';
import style from './Rank.module.css';

const Rank = ({
  subscriberCountRank,
  subscriberCountRankPercent,
  expectedRevenueRank,
  expectedRevenueRankPercent,
}) => {
  return (
    <g>
      <g>
        <rect
          className={style.rankTextContainer}
          x="686"
          y="55"
          rx="8"
          ry="8"
        ></rect>
        <text x="772" y="81" className={style.rankTitle}>
          유튜브 구독자 순위
        </text>
        <text x="772" y="110" className={style.rankNumber}>
          {subscriberCountRank
            ? subscriberCountRank.toLocaleString('en-US') + 'th'
            : '-'}
        </text>
        <text x="772" y="132" className={style.rankTop}>
          {subscriberCountRankPercent
            ? `[Top ${subscriberCountRankPercent}%]`
            : '데이터 산정 중'}
        </text>
      </g>
      <g>
        <rect
          className={style.rankTextContainer}
          x="878"
          y="55"
          rx="8"
          ry="8"
        ></rect>
        <text x="964" y="81" className={style.rankTitle}>
          유튜브 수익 순위
        </text>
        <text x="964" y="110" className={style.rankNumber}>
          {expectedRevenueRank
            ? expectedRevenueRank.toLocaleString('en-US') + 'th'
            : '-'}
        </text>
        <text x="964" y="132" className={style.rankTop}>
          {expectedRevenueRank
            ? `[Top ${expectedRevenueRankPercent}%]`
            : '데이터 산정 중'}
        </text>
      </g>
    </g>
  );
};

export default Rank;
