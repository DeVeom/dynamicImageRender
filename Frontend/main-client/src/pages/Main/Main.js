import React, { useState, useRef } from 'react';
import { gql, useQuery } from '@apollo/client';
import SearchTitleText from './components/SearchTitleText';
import SearchBox from './components/SearchBox';
import style from './Main.module.css';
import List from '../List/List';

const Main = () => {
  const [inputKeyword, setInputKeyword] = useState('');
  const [keyword, setKeyword] = useState('');
  const [order, setOrder] = useState('');
  const [textColor, setTextColor] = useState('a');
  const [hoveredDesc, setHoveredDesc] = useState([false, false]);
  const searchRef = useRef();

  const GET_LIST = gql`
    query GetList(
      $keyword: String!
      $size: Int!
      $from: Int!
      $order: String!
    ) {
      getChannelsForList(
        keyword: $keyword
        size: $size
        from: $from
        order: $order
      ) {
        channelsForList
      }
    }
  `;

  const { loading, error, data, fetchMore } = useQuery(GET_LIST, {
    variables: {
      keyword: `${keyword}`,
      from: 0,
      size: 20,
      order: `${order}`,
    },
  });

  const onLoadMore = () => {
    fetchMore({
      variables: {
        from: (data && data.getChannelsForList.channelsForList).length,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return Object.assign({}, prev, {
          getChannelsForList: {
            channelsForList: [
              ...prev.getChannelsForList.channelsForList,
              ...fetchMoreResult.getChannelsForList.channelsForList,
            ],
          },
        });
      },
    });
  };

  const InputSearchBox = e => {
    setInputKeyword(e.target.value);
  };

  const clickSearchBtn = () => {
    setKeyword(inputKeyword);
    searchRef.current.scrollIntoView({
      behavior: 'smooth',
    });
  };

  const enterSearchBtn = e => {
    if (e.key === 'Enter') {
      clickSearchBtn();
    }
  };

  const clickSortBox = e => {
    if (e === 'subscriberCount') return setOrder('subscriberCount');
    if (e === 'dailyViewCount') return setOrder('dailyViewCount');
    if (e === 'subscriberChange') return setOrder('subscriberChange');
    if (e === 'averageVideoViewCount') return setOrder('averageVideoViewCount');
    if (e === 'dailyAverageViewCount') return setOrder('dailyAverageViewCount');
  };

  const changeSortBoxColor = e => {
    if (e === 'a') return setTextColor('a');
    if (e === 'b') return setTextColor('b');
    if (e === 'c') return setTextColor('c');
    if (e === 'd') return setTextColor('d');
    if (e === 'e') return setTextColor('e');
  };

  const handleHoveredDesc = idx => {
    const newArr = Array(data?.getChannelsForList.channelsForList.length).fill(
      false
    );
    newArr[idx] = true;
    setHoveredDesc(newArr);
  };

  return (
    <div>
      <section className={style.searchContainer}>
        <SearchTitleText />
        <div className={style.searchBoxContainer}>
          <SearchBox
            searchRef={searchRef}
            setKeyword={setKeyword}
            InputSearchBox={InputSearchBox}
            clickSearchBtn={clickSearchBtn}
            enterSearchBtn={enterSearchBtn}
          />
        </div>
        <img
          className={style.searchBackGround}
          alt="버즈앤비"
          src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1740&q=80"
        />
      </section>
      <List
        error={error}
        loading={loading}
        data={data}
        onLoadMore={onLoadMore}
        clickSortBox={clickSortBox}
        textColor={textColor}
        changeSortBoxColor={changeSortBoxColor}
        hoveredDesc={hoveredDesc}
        setHoveredDesc={setHoveredDesc}
        handleHoveredDesc={handleHoveredDesc}
      />
    </div>
  );
};

export default Main;
