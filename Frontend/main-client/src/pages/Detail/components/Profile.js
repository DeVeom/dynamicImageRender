import React from 'react';
import style from './Profile.module.css';

const Profile = ({ thumbnails, title, description, category }) => {
  return (
    <div className={style.profile}>
      <div className={style.profileContainer}>
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
    </div>
  );
};

export default Profile;
