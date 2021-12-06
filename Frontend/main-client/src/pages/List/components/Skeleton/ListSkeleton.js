import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import style from '../../List.module.css';
import SortBox from '../SortBox/SortBox';

const Card = () => {
  return (
    <section className={style.card}>
      <section className={style.cardWrapper}>
        <Skeleton variant="circular" width={90} height={90} />
        <section className={style.infoWrapper}>
          <Skeleton height={35} />
          <Skeleton animation="wave" height={35} />
          <Skeleton animation={false} height={35} />
        </section>
        <section className={style.statusWrapper}>
          <Skeleton height={35} />
          <Skeleton animation="wave" height={35} />
          <Skeleton animation={false} height={35} />
        </section>
        <section className={style.imageClipWrapper}>
          <Skeleton variant="rectangular" style={{ width: 230, height: 90 }} />
        </section>
      </section>
    </section>
  );
};

const ListSkeleton = () => {
  return (
    <div className={style.listWrapper}>
      <SortBox />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
  );
};

export default ListSkeleton;
