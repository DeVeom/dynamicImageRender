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
        <text className={style.detailInfoTitle1} x="21" y="40">
          구독자 등급
        </text>
        <text className={style.detailInfo1} x="470" y="40">
          <rect width="50" height="24"></rect>
          {getGrade(subscriberCount).kor}
        </text>
        {
          <rect
            x={getSubscriberGradePosition(subscriberCount)}
            y="22"
            rx="10"
            ry="10"
            className={style.subscriberGradeContainer}
          ></rect>
        }
        {
          <text
            x={getSubscriberGradePosition(subscriberCount) + 24}
            y="33"
            className={style.subscriberGrade}
          >
            {getGrade(subscriberCount).eng}
          </text>
        }
      </g>
      <g>
        <text className={style.detailInfoTitle2} x="20" y="72">
          구독자수
        </text>
        <text className={style.detailInfo2} x="470" y="72">
          {getRoundNumber(subscriberCount)}
        </text>
      </g>
      <g>
        <text className={style.detailInfoTitle3} x="20" y="104">
          채널 가입일
        </text>
        <text className={style.detailInfo3} x="470" y="104">
          {getPublishDate(publishedAt)}
        </text>
      </g>
      <g>
        <text className={style.detailInfoTitle4} x="20" y="136">
          총 영상수
        </text>
        <text className={style.detailInfo4} x="470" y="136">
          {videoTotalCount}
        </text>
      </g>
    </g>
  );
};

export default DetailTextInfo;
