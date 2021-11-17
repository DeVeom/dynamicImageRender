import React from 'react';
import style from './Main.module.css';
import SearchTitleText from './components/SearchTitleText';
import SearchBox from './components/SearchBox';

const Main = () => {
  return (
    <section className={style.searchContainer}>
      <SearchTitleText />
      <div className={style.searchBoxContainer}>
        <SearchBox />
      </div>
      <img
        className={style.searchBackGround}
        alt="버즈앤비"
        src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1740&q=80"
      />
    </section>
  );
};

export default Main;
