import React from 'react';
import style from './Nav.module.css';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className={style.nav}>
      <div className={style.navContainer}>
        <div>
          <Link to={`/`}>
            <img
              className={style.navLogo}
              alt="버즈앤비"
              src="https://vling.net/media/logos/new_vling_logo.png"
            />
          </Link>
        </div>
        <div className={style.subMenuContainer}>
          <div className={style.subMenu}>
            <span>한국어</span>
          </div>
          <div className={style.subMenu}>
            <span>요금안내</span>
          </div>
          <div className={style.subMenu}>
            <span>로그인</span>
          </div>
          <div className={style.subMenu}>
            <span>무료 회원가입</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
