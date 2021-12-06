import React from 'react';
import style from './DetailTextInfo.module.css';

const DetailTextInfo = ({
  subscriberCount,
  publishedAt,
  videoTotalCount,
  getRoundNumber,
  getGrade,
  getSubscriberGradePosition,
  getPublishDate,
}) => {
  return (
    <g>
      <g>
        <text className={style.detailInfoTitle1} x="16" y="500">
          구독자 등급
        </text>
        <text className={style.detailInfo1} x="752" y="500">
          <rect width="50" height="24"></rect>
          {getGrade(subscriberCount).kor}
        </text>
        {
          <rect
            x={getSubscriberGradePosition(subscriberCount)}
            y="483"
            rx="10"
            ry="10"
            className={style.subscriberGradeContainer}
          ></rect>
        }
        {
          <text
            x={getSubscriberGradePosition(subscriberCount) + 24}
            y="494"
            className={style.subscriberGrade}
          >
            {getGrade(subscriberCount).eng}
          </text>
        }
      </g>
      <g>
        <text className={style.detailInfoTitle2} x="16" y="540">
          구독자수
        </text>
        <text className={style.detailInfo2} x="752" y="540">
          {getRoundNumber(subscriberCount)}
        </text>
      </g>
      <g>
        <text className={style.detailInfoTitle3} x="16" y="580">
          채널 가입일
        </text>
        <text className={style.detailInfo3} x="752" y="580">
          {getPublishDate(publishedAt)}
        </text>
      </g>
      <g>
        <text className={style.detailInfoTitle4} x="16" y="620">
          총 영상수
        </text>
        <text className={style.detailInfo4} x="752" y="620">
          {videoTotalCount}
        </text>
      </g>
    </g>
  );
};

export default DetailTextInfo;
