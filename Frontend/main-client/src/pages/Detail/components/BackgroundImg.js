import React from 'react';
import style from './BackgroundImg.module.css';

const BackgroundImg = ({ backgroundImg }) => {
  return (
    <div className={style.backgroundImgContainer}>
      <img className={style.backgroundImg} alt="버즈앤비" src={backgroundImg} />
    </div>
  );
};

export default BackgroundImg;
