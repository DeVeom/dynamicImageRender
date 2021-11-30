import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import style from './List.module.css';
import { useMediaQuery } from 'react-responsive';

const List = props => {
  const { data, onLoadMore, loading, error } = props;
  const { REACT_APP_LINK_TO_DETAIL } = process.env;
  const [newWindowName, setNewWindowName] = useState(0);

  const isPc = useMediaQuery({
    query: '(min-width:1050px)',
  });
  const isTablet = useMediaQuery({
    query: '(min-width:768px) and (max-width:1050px)',
  });

  if (loading) return <div className={style.loading}>Loading...</div>;
  if (error) return alert(`Error: ${error.message}`);

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
            <span className={style.subscriberSort}>구독자 순</span>
          </li>
        </ul>
      </section>
      {data && data.getChannelsForList.channelsForList && (
        <InfiniteScroll
          dataLength={(data && data.getChannelsForList.channelsForList).length}
          next={onLoadMore}
          hasMore={true}
        >
          {data.getChannelsForList.channelsForList.map((data, i) => {
            return (
              <section className={style.card} key={i + 1}>
                {isPc ? (
                  <section className={style.cardWrapper}>
                    <div className={style.rank}>{i + 1}</div>
                    <img
                      onClick={() => {
                        setNewWindowName(newWindowName + 1);
                        return window.open(
                          `${REACT_APP_LINK_TO_DETAIL}/search/${data.channelId}`,
                          `ToDetailPage${newWindowName}`
                        );
                      }}
                      src={data.thumbnails}
                      alt="profile"
                      className={style.profile}
                    />
                    <section
                      className={style.infoWrapper}
                      onClick={() => {
                        setNewWindowName(newWindowName + 1);
                        return window.open(
                          `${REACT_APP_LINK_TO_DETAIL}/search/${data.channelId}`,
                          'ToDetailPage'
                        );
                      }}
                    >
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
                              ? Math.round(
                                  data.averageVideoViewCount * 0.0001
                                ) + '만'
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
                ) : isTablet ? (
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
                            ? Math.round(data.averageVideoViewCount * 0.0001) +
                              '만'
                            : data.averageVideoViewCount}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
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
                            ? Math.round(data.averageVideoViewCount * 0.0001) +
                              '만'
                            : data.averageVideoViewCount}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </section>
            );
          })}
        </InfiniteScroll>
      )}
    </div>
  );
};

export default List;
