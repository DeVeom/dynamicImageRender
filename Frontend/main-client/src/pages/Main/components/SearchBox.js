import React from 'react';
import { useMediaQuery } from 'react-responsive';
import style from './SearchBox.module.css';

const SearchBox = props => {
  const { InputSearchBox, clickSearchBtn, enterSearchBtn, searchRef } = props;

  const isPc = useMediaQuery({
    query: '(min-width:1050px)',
  });

  return (
    <>
      {isPc ? (
        <div className={style.searchBox}>
          <input
            ref={searchRef}
            className={style.searchInput}
            onChange={InputSearchBox}
            onKeyPress={enterSearchBtn}
            type="text"
            placeholder="채널명 또는 관련 단어로 검색해주세요"
          />
          <div className={style.searchBtn}>
            <img
              alt="버즈앤비"
              src="https://vling.net/media/icons/home_search_icon.png"
              onClick={clickSearchBtn}
            />
          </div>
        </div>
      ) : (
        <div className={style.searchBox}>
          <input
            ref={searchRef}
            className={style.searchInput}
            onChange={InputSearchBox}
            onKeyPress={enterSearchBtn}
            type="text"
            placeholder="채널 또는 관련 단어 검색"
          />
          <div className={style.searchBtn}>
            <img
              alt="버즈앤비"
              src="https://vling.net/media/icons/home_search_icon.png"
              onClick={clickSearchBtn}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default SearchBox;
