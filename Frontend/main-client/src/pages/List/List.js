import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useMediaQuery } from 'react-responsive';
import ListSkeleton from '../../components/skeleton/ListSkeleton';
import style from './List.module.css';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const List = props => {
  const { data, onLoadMore, loading, error, searchRef } = props;
  const { REACT_APP_LINK_TO_DETAIL } = process.env;
  const [newWindowName, setNewWindowName] = useState(0);

  const isPc = useMediaQuery({
    query: '(min-width:1050px)',
  });
  const isTablet = useMediaQuery({
    query: '(min-width:768px) and (max-width:1050px)',
  });

  const handleCategory = category => {
    let korCategory = '';
    switch (category) {
      case 'FASHION':
        korCategory = '패션';
        break;
      case 'BEAUTY':
        korCategory = '뷰티';
        break;
      case 'FOOD':
        korCategory = '푸드/먹방';
        break;
      case 'ENTN':
        korCategory = '엔터테인먼트';
        break;
      case 'LIFE':
        korCategory = 'Vlog/일상';
        break;
      case 'TRAVEL':
        korCategory = '여행';
        break;
      case 'ASMR':
        korCategory = 'ASMR';
        break;
      case 'GAME':
        korCategory = '게임';
        break;
      case 'PET':
        korCategory = '펫/동식물';
        break;
      case 'TECH':
        korCategory = 'IT/과학기술';
        break;
      case 'FILM':
        korCategory = '영화/애니';
        break;
      case 'CAR':
        korCategory = '자동차';
        break;
      case 'MUSIC':
        korCategory = '음악';
        break;
      case 'SPORTS':
        korCategory = '스포츠';
        break;
      case 'POLITICS':
        korCategory = '시사/정치';
        break;
      case 'EDU':
        korCategory = '교육';
        break;
      case 'SOCIETY':
        korCategory = '사회/종교';
        break;
      case 'KIDS':
        korCategory = '키즈';
        break;
      case 'ECONOMY':
        korCategory = '경제';
        break;
      case 'INFO':
        korCategory = '지식/정보';
        break;
      case 'NEWS':
        korCategory = '뉴스';
        break;
      case 'ETC':
        korCategory = '기타';
        break;
      default:
        korCategory = '기타';
        break;
    }
    return korCategory;
  };

  if (loading) return <ListSkeleton />;
  if (error) return alert(`Error: ${error.message}`);

  return (
    <div className={style.listWrapper}>
      <section className={style.sortWrapper} ref={searchRef}>
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
          loader={
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '45px',
              }}
            >
              <CircularProgress size={80} />
            </Box>
          }
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
                          `ToDetailPage${newWindowName}`
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
                            {handleCategory(category)}
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
                          <div
                            className={
                              (
                                data.dailyViewChange / data.dailyViewCount
                              ).toFixed(2) >= 0
                                ? style.countChangeStatus
                                : style.minusCountChangeStatus
                            }
                          >
                            {`${(
                              data.dailyViewChange / data.dailyViewCount
                            ).toFixed(2)}%`}
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
