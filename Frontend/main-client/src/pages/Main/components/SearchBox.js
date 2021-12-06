import React from 'react';
import style from './SearchBox.module.css';

const SearchBox = props => {
  const { InputSearchBox, clickSearchBtn, enterSearchBtn, searchRef } = props;

  return (
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
  );
};

export default SearchBox;
