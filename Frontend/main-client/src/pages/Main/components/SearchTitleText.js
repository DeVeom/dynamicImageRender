import React from 'react';
import style from './SearchTitleText.module.css';

const SearchTitleText = () => {
  return (
    <div className={style.searchTitleText}>
      <p className={style.searchTitle}>블링, 요즘 뜨는 유튜버 찾아줘!</p>
      <div className={style.searchSubTitleContainer}>
        <span className={style.searchSubTitle}>
          vling은 광고주와 유튜버가 필요한 모든 데이터와
        </span>
        <span className={style.searchSubTitle}>인사이트를 제공합니다.</span>
      </div>
    </div>
  );
};

export default SearchTitleText;
