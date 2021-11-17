import React, { useEffect, useState } from 'react';
import style from './List.module.css';

const List = () => {
  const [listData, setListData] = useState([]);

  useEffect(() => {
    fetch('/data/Temp/tempData.json')
      .then(res => res.json())
      .then(res => {
        setListData(res.data);
      });
  }, []);

  return (
    <div className={style.listWrapper}>
      <section className={style.sortWrapper}>
        <ul className={style.sortTitle}>
          <li>
            <img
              className={style.subscriberCheckImg}
              src="https://vling.net/media/icons/check_icon2.png"
              alt="check"
            />
            구독자 순
          </li>
        </ul>
      </section>
      {listData.map((data, i) => {
        return (
          <section className={style.card} key={data.id}>
            <section className={style.cardWrapper}>
              <div className={style.rank}>{i + 1}</div>
              <img
                src={data.channelProfile}
                alt="profile"
                className={style.profile}
              />
              <section className={style.infoWrapper}>
                <div className={style.infoName}>{data.name}</div>
                <div className={style.infoDescription}>{data.description}</div>
                <div className={style.infoTab}>
                  {data.category[0].categoryName}
                </div>
              </section>
              <section className={style.statusWrapper}>
                <ul>
                  <li>
                    <div className={style.subscriberStatus}>
                      <img
                        className={style.subscriberIconImg}
                        src="https://vling.net/media/icons/channel-subs-icon.png"
                        alt="구독자 아이콘"
                      />
                      <p>구독자 수</p>
                    </div>
                    <div className={style.countStatus}>
                      {data.subscriberCount}
                    </div>
                    <div className={style.countChangeStatus}>
                      <img
                        className={style.countChangeImg}
                        src="https://vling.net/media/icons/statusChange_up.png"
                      />
                      {data.subscriberCountChange}
                    </div>
                  </li>
                  <li>
                    <div className={style.subscriberStatus}>
                      <img
                        className={style.subscriberIconImg}
                        src="https://vling.net/media/icons/channel-subs-icon.png"
                        alt="조회수 아이콘"
                      />
                      <p>일일 조회 수</p>
                    </div>
                    <div className={style.countStatus}>{data.dailyViews}</div>
                    <div className={style.countChangeStatus}>
                      {data.dailyViewsChange}
                    </div>
                  </li>
                  <li>
                    <div className={style.subscriberStatus}>
                      <img
                        className={style.subscriberIconImg}
                        src="https://vling.net/media/icons/channel-subs-icon.png"
                        alt="영상별 평균 조회수 아이콘"
                      />
                      <p>영상별 평균 조회수</p>
                    </div>
                    <div className={style.countStatus}>
                      {data.averageOfViewsPerVideo}
                    </div>
                  </li>
                </ul>
              </section>
            </section>
          </section>
        );
      })}
    </div>
  );
};

export default List;
