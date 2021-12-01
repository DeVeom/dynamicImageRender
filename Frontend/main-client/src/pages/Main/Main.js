import React, { useState, useRef } from 'react';
import style from './Main.module.css';
import List from '../List/List';
import SearchTitleText from './components/SearchTitleText';
import SearchBox from './components/SearchBox';
import { gql, useQuery } from '@apollo/client';

const Main = () => {
  const [inputKeyword, setInputKeyword] = useState('');
  const [keyword, setKeyword] = useState('');
  const searchRef = useRef();

  const GET_LIST = gql`
    query GetList($keyword: String!, $size: Int!, $from: Int!) {
      getChannelsForList(keyword: $keyword, size: $size, from: $from) {
        channelsForList
      }
    }
  `;

  const { loading, error, data, fetchMore } = useQuery(GET_LIST, {
    fetchPolicy: 'network-only',
    variables: { keyword: `${keyword}`, from: 0, size: 20 },
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

  return (
    <div>
      <section className={style.searchContainer}>
        <SearchTitleText />
        <div className={style.searchBoxContainer}>
          <SearchBox
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
        searchRef={searchRef}
      />
    </div>
  );
};

export default Main;
