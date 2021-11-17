import React, { useState, useEffect } from 'react';
import style from './Detail.module.css';

const Detail = () => {
  const [youtuberInfo, setYoutuberInfo] = useState({});

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    fetch(`/data/temp/tempData.json`)
      .then(res => res.json())
      .then(res => {
        setYoutuberInfo(res.data[0]);
      })
      .catch(console.log);
  };

  return (
    <section className={style.detailContainer}>
      <div className={style.backgroundImgContainer}>
        <img
          className={style.backgroundImg}
          alt="버즈앤비"
          src={youtuberInfo.backgroundImg}
        />
      </div>
      <div className={style.profile}>
        <div className={style.profileLeftContainer}>
          <div className={style.profileImgContainer}>
            <img
              className={style.profileImg}
              alt="버즈앤비"
              src={youtuberInfo.channelProfile}
            />
          </div>
          <div className={style.profileTextContainer}>
            <div>
              <p className={style.channelName}>{youtuberInfo.name}</p>
            </div>
            <div>
              <p className={style.channelDescription}>
                {youtuberInfo.description}
              </p>
            </div>
            <div className={style.channelCategoryContainer}>
              {youtuberInfo.category?.map(category => (
                <p className={style.channelCategory}>{category.categoryName}</p>
              ))}
            </div>
          </div>
        </div>
        <div className={style.profileRigthContainer}>
          <div className={style.checkCountry}>
            <img
              className={style.checkCountryIcon}
              alt="버즈앤비"
              src="https://vling.net/media/icons/channel-detail-nation-icon.png"
            />
            <p>대한민국</p>
          </div>
          <div className={style.shareBtn}>
            <img
              alt="버즈앤비"
              src="https://vling.net/media/icons/share-icon-new.png"
            />
          </div>
          <div className={style.likeBtn}>
            <img
              alt="버즈앤비"
              src="https://vling.net/media/icons/favorite-icon-new.png"
            />
          </div>
          <div className={style.offerAdBtn}>
            <p>광고 제안하기</p>
          </div>
        </div>
      </div>
      <div className={style.analysisMenu}>
        <p className={style.analysisMenuText}>채널 분석</p>
        <p className={style.analysisMenuText}>영상 분석</p>
        <p className={style.analysisMenuText}>시청자 분석</p>
        <p className={style.analysisMenuText}>광고 단가</p>
        <p className={style.analysisMenuText}>관련 채널 분석</p>
      </div>
      <div className={style.analysisReport}>요약 분석 리포트</div>
    </section>
  );
};

export default Detail;
