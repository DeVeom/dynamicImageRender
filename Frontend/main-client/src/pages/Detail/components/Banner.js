import React from 'react';
import style from './Banner.module.css';

const BackgroundImg = ({ banner, title }) => {
  return (
    <div className={style.backgroundImgContainer}>
      {banner && (
        <img className={style.backgroundImg} alt={title} src={banner} />
      )}
    </div>
  );
};

export default BackgroundImg;
