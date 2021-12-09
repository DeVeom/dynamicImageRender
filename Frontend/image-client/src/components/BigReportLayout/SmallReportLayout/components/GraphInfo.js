import React from 'react';
import style from './GraphInfo.module.css';

function GraphInfo({
  dailyViewCountSummary,
  videoViewCountSummary,
  activePercentSummary,
  favorablePercentSummary,
  summaryVerticalPoint,
  summaryHeight,
  summaryTextFinalPosition,
}) {
  return (
    <g>
      <g>
        <rect
          className={style.competingChannelAvg}
          x="20"
          y="371"
          rx="5"
          ry="5"
        ></rect>
        <text className={style.competingChannelAvgText} x="245" y="384">
          경쟁 채널 평균
        </text>
      </g>
      <g>
        <g>
          {
            <path
              className={style.channelSummaryGraph}
              style={
                dailyViewCountSummary >= 0
                  ? { fill: '#0A9D58', stroke: '#0A9D58' }
                  : { fill: '#DA4437', stroke: '#DA4437' }
              }
              d={`M 55 ${summaryVerticalPoint(
                dailyViewCountSummary
              )} V ${summaryHeight(
                dailyViewCountSummary
              )} H 105 V ${summaryVerticalPoint(dailyViewCountSummary)}`}
            ></path>
          }
          {
            <text
              className={style.channelSummaryText}
              style={
                dailyViewCountSummary >= 0
                  ? { fill: '#0A9D58' }
                  : { fill: '#DA4437' }
              }
              x="80"
              y={`${summaryTextFinalPosition(dailyViewCountSummary)}`}
            >
              {dailyViewCountSummary >= 0
                ? '+' + dailyViewCountSummary
                : dailyViewCountSummary}
              %
            </text>
          }
        </g>
        <g>
          {
            <path
              className={style.channelSummaryGraph}
              style={
                videoViewCountSummary >= 0
                  ? { fill: '#0A9D58', stroke: '#0A9D58' }
                  : { fill: '#DA4437', stroke: '#DA4437' }
              }
              d={`M 165 ${summaryVerticalPoint(
                videoViewCountSummary
              )} V ${summaryHeight(
                videoViewCountSummary
              )} H 215 V ${summaryVerticalPoint(videoViewCountSummary)}`}
            ></path>
          }
          {
            <text
              className={style.channelSummaryText}
              style={
                videoViewCountSummary >= 0
                  ? { fill: '#0A9D58' }
                  : { fill: '#DA4437' }
              }
              x="190"
              y={`${summaryTextFinalPosition(videoViewCountSummary)}`}
            >
              {videoViewCountSummary >= 0
                ? '+' + videoViewCountSummary
                : videoViewCountSummary}
              %
            </text>
          }
        </g>
        <g>
          {
            <path
              className={style.channelSummaryGraph}
              style={
                activePercentSummary >= 0
                  ? { fill: '#0A9D58', stroke: '#0A9D58' }
                  : { fill: '#DA4437', stroke: '#DA4437' }
              }
              d={`M 275 ${summaryVerticalPoint(
                activePercentSummary
              )} V ${summaryHeight(
                activePercentSummary
              )} H 325 V ${summaryVerticalPoint(activePercentSummary)}`}
            ></path>
          }
          {
            <text
              className={style.channelSummaryText}
              style={
                activePercentSummary >= 0
                  ? { fill: '#0A9D58' }
                  : { fill: '#DA4437' }
              }
              x="300"
              y={`${summaryTextFinalPosition(activePercentSummary)}`}
            >
              {activePercentSummary >= 0
                ? '+' + activePercentSummary
                : activePercentSummary}
              %
            </text>
          }
        </g>
        <g>
          {
            <path
              className={style.channelSummaryGraph}
              style={
                favorablePercentSummary >= 0
                  ? { fill: '#0A9D58', stroke: '#0A9D58' }
                  : { fill: '#DA4437', stroke: '#DA4437' }
              }
              d={`M 385 ${summaryVerticalPoint(
                favorablePercentSummary
              )} V ${summaryHeight(
                favorablePercentSummary
              )} H 435 V ${summaryVerticalPoint(favorablePercentSummary)}`}
            ></path>
          }
          {
            <text
              className={style.channelSummaryText}
              style={
                favorablePercentSummary >= 0
                  ? { fill: '#0A9D58' }
                  : { fill: '#DA4437' }
              }
              x="410"
              y={`${summaryTextFinalPosition(favorablePercentSummary)}`}
            >
              {favorablePercentSummary >= 0
                ? '+' + favorablePercentSummary
                : favorablePercentSummary}
              %
            </text>
          }
        </g>
      </g>
    </g>
  );
}

export default GraphInfo;
