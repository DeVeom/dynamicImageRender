import React from 'react';
import { useMediaQuery } from 'react-responsive';
import style from './SearchTitleText.module.css';

const SearchTitleText = () => {
  const isPc = useMediaQuery({
    query: '(min-width:1050px)',
  });
  const isCommon = useMediaQuery({
    query: '(min-width:480px) and (max-width:1050px)',
  });

  return (
    <>
      {isPc ? (
        <div className={style.searchTitleText}>
          <p className={style.searchTitle}>블링, 요즘 뜨는 유튜버 찾아줘!</p>
          <div className={style.searchSubTitleContainer}>
            <span className={style.searchSubTitle}>
              vling은 광고주와 유튜버가 필요한 모든 데이터와
            </span>
            <span className={style.searchSubTitle}>인사이트를 제공합니다.</span>
          </div>
        </div>
      ) : isCommon ? (
        <div className={style.searchTitleText}>
          <p className={style.searchTitle}>블링, 요즘 뜨는 유튜버 찾아줘!</p>
          <div className={style.searchSubTitleContainer}>
            <span className={style.searchSubTitle}>
              vling은 광고주와 유튜버가 필요한 모든 데이터와
            </span>
            <span className={style.searchSubTitle}>인사이트를 제공합니다.</span>
          </div>
        </div>
      ) : (
        <div className={style.searchTitleText}>
          <div className={style.searchTitle}>
            <p className={style.searchTitleMain}>블링,</p>
            <p className={style.searchTitleSub}>요즘 뜨는 유튜버 찾아줘!</p>
          </div>
          <div className={style.searchSubTitleWrapper}>
            <p className={style.searchSubMain}>
              vling은 광고주와 유튜버가 필요한 모든 데이터와
            </p>
            <p className={style.searchSub}>인사이트를 제공합니다.</p>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchTitleText;
