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
          x="16"
          y="222"
          rx="5"
          ry="5"
        ></rect>
        <text className={style.competingChannelAvgText} x="315" y="236">
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
              d={`M 56 ${summaryVerticalPoint(
                dailyViewCountSummary
              )} V ${summaryHeight(
                dailyViewCountSummary
              )} H 126 V ${summaryVerticalPoint(dailyViewCountSummary)}`}
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
              x="91"
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
              d={`M 205 ${summaryVerticalPoint(
                videoViewCountSummary
              )} V ${summaryHeight(
                videoViewCountSummary
              )} H 275 V ${summaryVerticalPoint(videoViewCountSummary)}`}
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
              x="240"
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
              d={`M 355 ${summaryVerticalPoint(
                activePercentSummary
              )} V ${summaryHeight(
                activePercentSummary
              )} H 425 V ${summaryVerticalPoint(activePercentSummary)}`}
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
              x="390"
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
              d={`M 505 ${summaryVerticalPoint(
                favorablePercentSummary
              )} V ${summaryHeight(
                favorablePercentSummary
              )} H 575 V ${summaryVerticalPoint(favorablePercentSummary)}`}
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
              x="540"
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
