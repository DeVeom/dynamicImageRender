import React from 'react';
// import { useMediaQuery } from 'react-responsive';
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

const PcSkeleton = () => {
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

// const TabletSkeleton = () => {
//   return (
//     <div className={style.cardMobileWrapper}>
//       <section className={style.cardMobileTop}>
//         <Skeleton sx={{ m: 1 }} variant="circular" width={30} height={30} />
//         <Skeleton height={35} width={300} />
//       </section>
//       <section className={style.cardMobileBottom}>
//         <section calssName={style.cardMobileBottomBox}>
//           <Skeleton animation="wave" height={35} width={200} />
//           <Skeleton animation={false} height={35} />
//         </section>
//         <section calssName={style.cardMobileBottomBox}>
//           <Skeleton animation="wave" height={35} width={200} />
//           <Skeleton animation={false} height={35} />
//         </section>
//         <section calssName={style.cardMobileBottomBox}>
//           <Skeleton animation="wave" height={35} width={200} />
//           <Skeleton animation={false} height={35} />
//         </section>
//       </section>
//     </div>
//   );
// };

// const ListSkeleton = () => {
//   const isPc = useMediaQuery({
//     query: '(min-width:1050px)',
//   });
//   const isTablet = useMediaQuery({
//     query: '(min-width:768px) and (max-width:1050px)',
//   });

//   return <>{isPc ? <PcSkeleton /> : isTablet ? <TabletSkeleton /> : null}</>;
// };

export default PcSkeleton;
