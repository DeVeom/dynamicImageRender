import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useMediaQuery } from 'react-responsive';
import Spinner from '../../components/Spinner/Spinner';
import SortBox from './components/SortBox/SortBox';
import PcCard from './components/Card/PcCard';
import TabletCard from './components/Card/TabletCard';
import MobileCard from './components/Card/MobileCard';
import ListSkeleton from './components/Skeleton/ListSkeleton';
import style from './List.module.css';

const List = props => {
  const {
    error,
    loading,
    data,
    onLoadMore,
    clickSortBox,
    textColor,
    changeSortBoxColor,
    hoveredDesc,
    setHoveredDesc,
    handleHoveredDesc,
  } = props;

  const isPc = useMediaQuery({
    query: '(min-width:1050px)',
  });
  const isTablet = useMediaQuery({
    query: '(min-width:768px) and (max-width:1050px)',
  });

  if (loading) return <ListSkeleton />;
  if (error) return alert(`Error: ${error.message}`);

  return (
    <div className={style.listWrapper}>
      <SortBox
        clickSortBox={clickSortBox}
        textColor={textColor}
        changeSortBoxColor={changeSortBoxColor}
      />
      {data && data.getChannelsForList.channelsForList && (
        <InfiniteScroll
          dataLength={(data && data.getChannelsForList.channelsForList).length}
          next={onLoadMore}
          hasMore={true}
          loader={<Spinner />}
        >
          {data.getChannelsForList.channelsForList.map((data, i) => {
            return (
              <section className={style.card} key={i + 1}>
                {isPc ? (
                  <PcCard
                    data={data}
                    i={i}
                    hoveredDesc={hoveredDesc}
                    setHoveredDesc={setHoveredDesc}
                    handleHoveredDesc={handleHoveredDesc}
                  />
                ) : isTablet ? (
                  <TabletCard data={data} />
                ) : (
                  <MobileCard data={data} />
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
