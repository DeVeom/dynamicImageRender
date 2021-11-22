import React, { useState, useEffect } from 'react';
import style from './Main.module.css';
import List from '../List/List';
import SearchTitleText from './components/SearchTitleText';
import SearchBox from './components/SearchBox';
import { gql, useLazyQuery } from '@apollo/client';

const Main = () => {
  const [inputKeyword, setInputKeyword] = useState('');
  const [keyword, setKeyword] = useState('');

  const GET_LIST = gql`
  query GetList($keyword: String = "${keyword}") {
    channelsForList(
      userId: ""
      from: 0
      size: 20
      minSubscriber: 0
      maxSubscriber: 200000000000
      minViews: 0
      maxViews: 200000000000
      order: "subscriberCount"
      minVideoViews: 0
      maxVideoViews: 200000000000
      minAdPrice: 0
      maxAdPrice: 200000000000
      categories: [""]
      nation: "KR"
      keyword: $keyword
    )
  }
`;

  const [GetList, { loading, error, data }] = useLazyQuery(GET_LIST);

  const InputSearchBox = e => {
    setInputKeyword(e.target.value);
  };

  const clickSearchBtn = () => {
    setKeyword(inputKeyword);
    GetList();
  };

  const enterSearchBtn = e => {
    if (e.key === 'Enter') {
      clickSearchBtn();
    }
  };

  console.log(loading, error, data);

  return (
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
      {keyword ? <List data={data} /> : null}
    </section>
  );
};

export default Main;
