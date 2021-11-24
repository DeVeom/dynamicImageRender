import React from 'react';
import style from './List.module.css';
import InfiniteScroll from 'react-infinite-scroll-component';

const List = props => {
  const { data, onLoadMore, loading } = props;
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
      {!loading && data && data?.getChannelsForList.channelsForList && (
        <InfiniteScroll
          dataLength={data?.getChannelsForList.channelsForList.length}
          next={onLoadMore}
          hasMore={true}
        >
          {data?.getChannelsForList.channelsForList.map((data, i) => {
            return (
              <section className={style.card} key={i + 1}>
                <section className={style.cardWrapper}>
                  <div className={style.rank}>{i + 1}</div>
                  <img
                    src={data.thumbnails}
                    alt="profile"
                    className={style.profile}
                  />
                  <section className={style.infoWrapper}>
                    <div className={style.infoName}>{data.title}</div>
                    <div className={style.infoDescription}>
                      {data.description}
                    </div>
                    {data.category.map((category, i) => {
                      return (
                        <div className={style.infoCategory} key={i}>
                          {category}
                        </div>
                      );
                    })}
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
                          {data.subscriberCount > 10000
                            ? Math.round(data.subscriberCount * 0.0001) + '만'
                            : data.subscriberCount}
                        </div>
                        <div className={style.countChangeStatus}>
                          <img
                            className={style.countChangeImg}
                            src="https://vling.net/media/icons/statusChange_up.png"
                            alt="구독자 수 변화량 아이콘"
                          />
                          {data.subscriberChange.toLocaleString()}
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
                        <div className={style.countStatus}>
                          {data.dailyViewCount > 10000
                            ? Math.round(data.dailyViewCount * 0.0001) + '만'
                            : data.dailyViewCount}
                        </div>
                        <div className={style.countChangeStatus}>
                          {data.dailyViewChange % data.dailyViewCount}
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
                          {data.averageVideoViewCount > 10000
                            ? Math.round(data.averageVideoViewCount * 0.0001) +
                              '만'
                            : data.averageVideoViewCount}
                        </div>
                      </li>
                    </ul>
                  </section>
                  <section className={style.imageClipWrapper}>
                    <img
                      className={style.imageClipWrapperImg}
                      src={data.video[0].thumbnails}
                      alt="최근 동영상"
                    />
                  </section>
                </section>
              </section>
            );
          })}
        </InfiniteScroll>
      )}
    </div>
  );
};

export default List;
