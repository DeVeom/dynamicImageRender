import React from 'react';
import style from './Rank.module.css';

function Rank({
  subscriberCountRank,
  subscriberCountRankPercent,
  expectedRevenueRank,
  expectedRevenueRankPercent,
}) {
  return (
    <g>
      <g>
        <rect
          className={style.rankTextContainer}
          x="16"
          y="349"
          rx="8"
          ry="8"
        ></rect>
        <text x="192" y="370" className={style.rankTitle}>
          유튜브 구독자 순위
        </text>
        <text x="192" y="400" className={style.rankNumber}>
          {subscriberCountRank
            ? subscriberCountRank.toLocaleString('en-US') + 'th'
            : '-'}
        </text>
        <text x="192" y="420" className={style.rankTop}>
          {subscriberCountRankPercent
            ? `[Top ${subscriberCountRankPercent}%]`
            : '데이터 산정 중'}
        </text>
      </g>
      <g>
        <rect
          className={style.rankTextContainer}
          x="400"
          y="349"
          rx="8"
          ry="8"
        ></rect>
        <text x="576" y="370" className={style.rankTitle}>
          유튜브 수익 순위
        </text>
        <text x="576" y="400" className={style.rankNumber}>
          {expectedRevenueRank
            ? expectedRevenueRank.toLocaleString('en-US') + 'th'
            : '-'}
        </text>
        <text x="576" y="420" className={style.rankTop}>
          {expectedRevenueRank
            ? `[Top ${expectedRevenueRankPercent}%]`
            : '데이터 산정 중'}
        </text>
      </g>
    </g>
  );
}

export default Rank;
