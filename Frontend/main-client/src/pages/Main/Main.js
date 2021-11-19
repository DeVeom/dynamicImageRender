import React from 'react';
import style from './Main.module.css';
import List from '../List/List';

const Main = () => {
  return (
    <section className={style.searchContainer}>
      <div className={style.searchText}>
        <p className={style.searchTitle}>블링, 요즘 뜨는 유튜버 찾아줘!</p>
        <div className={style.searchSubTitleContainer}>
          <p className={style.searchSubTitle}>
            vling은 광고주와 유튜버가 필요한 모든 데이터와
          </p>
          <p className={style.searchSubTitle}>인사이트를 제공합니다.</p>
        </div>
      </div>
      <div className={style.searchBoxContainer}>
        <div className={style.searchBox}>
          <div className={style.searchOption}>
            <span className={style.searchOptionText}>채널</span>
            <img
              className={style.searchOptionIcon}
              alt="버즈앤비"
              src="https://vling.net/media/icons/arrow_black_down.png"
            />
          </div>
          <input
            className={style.searchInput}
            type="text"
            placeholder="채널명 또는 관련 단어로 검색해주세요"
          />
          <div className={style.searchBtn}>
            <img
              alt="버즈앤비"
              src="https://vling.net/media/icons/home_search_icon.png"
            />
          </div>
        </div>
      </div>
      <img
        className={style.searchBackGround}
        alt="버즈앤비"
        src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1740&q=80"
      />
      <List />
    </section>
  );
};

export default Main;
