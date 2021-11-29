import React from 'react';
import style from './GraphInfo.module.css';

function GraphInfo({
  dailyViewCountSummary,
  videoViewCountSummary,
  activePercentSummary,
  favorablePercentSummary,
  summaryVerticalPoint,
  summaryHeight,
  summaryTextStartPosition,
  summaryTextFinalPosition,
}) {
  return (
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
            )} V ${summaryVerticalPoint(
              dailyViewCountSummary
            )} H 126 V ${summaryVerticalPoint(dailyViewCountSummary)}`}
          >
            <animate
              attributeName="d"
              dur="1s"
              to={`M 56 ${summaryVerticalPoint(
                dailyViewCountSummary
              )} V ${summaryHeight(
                dailyViewCountSummary
              )} H 126 V ${summaryVerticalPoint(dailyViewCountSummary)}`}
              fill="freeze"
              begin="2s"
            ></animate>
          </path>
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
            y={`${summaryTextStartPosition(dailyViewCountSummary)}`}
          >
            {dailyViewCountSummary >= 0
              ? '+' + dailyViewCountSummary
              : dailyViewCountSummary}
            %
            <animate
              attributeName="y"
              dur="1s"
              to={`${summaryTextFinalPosition(dailyViewCountSummary)}`}
              fill="freeze"
              begin="2s"
            ></animate>
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
            )} V ${summaryVerticalPoint(
              videoViewCountSummary
            )} H 275 V ${summaryVerticalPoint(videoViewCountSummary)}`}
          >
            <animate
              attributeName="d"
              dur="1s"
              to={`M 205 ${summaryVerticalPoint(
                videoViewCountSummary
              )} V ${summaryHeight(
                videoViewCountSummary
              )} H 275 V ${summaryVerticalPoint(videoViewCountSummary)}`}
              fill="freeze"
              begin="2s"
            ></animate>
          </path>
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
            y={`${summaryTextStartPosition(videoViewCountSummary)}`}
          >
            {videoViewCountSummary >= 0
              ? '+' + videoViewCountSummary
              : videoViewCountSummary}
            %
            <animate
              attributeName="y"
              dur="1s"
              to={`${summaryTextFinalPosition(videoViewCountSummary)}`}
              fill="freeze"
              begin="2s"
            ></animate>
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
            )} V ${summaryVerticalPoint(
              activePercentSummary
            )} H 425 V ${summaryVerticalPoint(activePercentSummary)}`}
          >
            <animate
              attributeName="d"
              dur="1s"
              to={`M 355 ${summaryVerticalPoint(
                activePercentSummary
              )} V ${summaryHeight(
                activePercentSummary
              )} H 425 V ${summaryVerticalPoint(activePercentSummary)}`}
              fill="freeze"
              begin="2s"
            ></animate>
          </path>
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
            y={`${summaryTextStartPosition(activePercentSummary)}`}
          >
            {activePercentSummary >= 0
              ? '+' + activePercentSummary
              : activePercentSummary}
            %
            <animate
              attributeName="y"
              dur="1s"
              to={`${summaryTextFinalPosition(activePercentSummary)}`}
              fill="freeze"
              begin="2s"
            ></animate>
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
            )} V ${summaryVerticalPoint(
              favorablePercentSummary
            )} H 575 V ${summaryVerticalPoint(favorablePercentSummary)}`}
          >
            <animate
              attributeName="d"
              dur="1s"
              to={`M 505 ${summaryVerticalPoint(
                favorablePercentSummary
              )} V ${summaryHeight(
                favorablePercentSummary
              )} H 575 V ${summaryVerticalPoint(favorablePercentSummary)}`}
              fill="freeze"
              begin="2s"
            ></animate>
          </path>
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
            y={`${summaryTextStartPosition(favorablePercentSummary)}`}
          >
            {favorablePercentSummary >= 0
              ? '+' + favorablePercentSummary
              : favorablePercentSummary}
            %
            <animate
              attributeName="y"
              dur="1s"
              to={`${summaryTextFinalPosition(favorablePercentSummary)}`}
              fill="freeze"
              begin="2s"
            ></animate>
          </text>
        }
      </g>
    </g>
  );
}

export default GraphInfo;
