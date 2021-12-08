import React, { useState } from 'react';
import style from '../../List.module.css';

const MobileLCard = props => {
  const { data } = props;
  const { REACT_APP_LINK_TO_DETAIL } = process.env;
  const [newWindowName, setNewWindowName] = useState(0);

  return (
    <div className={style.cardMobileWrapper}>
      <div
        className={style.cardMobileTop}
        onClick={() => {
          setNewWindowName(newWindowName + 1);
          return window.open(
            `${REACT_APP_LINK_TO_DETAIL}/search/${data.channelId}`,
            `ToDetailPage${newWindowName}`
          );
        }}
      >
        <img
          src={data.thumbnails}
          alt="profile"
          className={style.mobileProfile}
        />
        {data.title}
      </div>
      <div className={style.cardMobileBottom}>
        <div className={style.cardMobileBottomBox}>
          <span>구독자수</span>
          <span className={style.countNumber}>
            {data.subscriberCount > 10000
              ? Math.round(data.subscriberCount * 0.0001) + '만'
              : data.subscriberCount}
          </span>
        </div>
        <div className={style.cardMobileBottomBox}>
          <span>일일 조회수</span>
          <span className={style.countNumber}>
            {data.dailyViewCount > 10000
              ? Math.round(data.dailyViewCount * 0.0001) + '만'
              : data.dailyViewCount}
          </span>
        </div>
        <div className={style.cardMobileBottomBox}>
          <span>영상별 평균 조회수</span>
          <span className={style.countNumber}>
            {data.averageVideoViewCount > 10000
              ? Math.round(data.averageVideoViewCount * 0.0001) + '만'
              : data.averageVideoViewCount}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MobileLCard;
