import React from 'react';
import style from './Profile.module.css';

const Profile = ({ thumbnails, title, description, category }) => {
  return (
    <div className={style.profile}>
      <div className={style.profileLeftContainer}>
        <div className={style.profileImgContainer}>
          <img className={style.profileImg} alt={title} src={thumbnails} />
        </div>
        <div className={style.profileTextContainer}>
          <div>
            <p className={style.channelName}>{title}</p>
          </div>
          <div>
            <p className={style.channelDescription}>{description}</p>
          </div>
          <div className={style.channelCategoryContainer}>
            {category?.map((el, idx) => (
              <p key={idx} className={style.channelCategory}>
                {el}
              </p>
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
          <p className={style.offerAdText}>광고 제안하기</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
