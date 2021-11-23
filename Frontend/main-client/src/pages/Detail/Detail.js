import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import style from './Detail.module.css';
import BackgroundImg from './components/BackgroundImg';
import Profile from './components/Profile';
import AnalysisMenu from './components/AnalysisMenu';
import AnalysisReport from './components/AnalysisReport';

const Detail = () => {
  const [youtuberInfo, setYoutuberInfo] = useState({});

  const GET_DATA = gql`
    query {
      getChannelData(id: "UCOmHUn--16B90oW2L6FRR3A") {
        channelForGuest
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_DATA);
  console.log(data);

  if (loading) return <p style={{ paddingTop: '100px' }}>loading...</p>;

  return (
    <section className={style.detailContainer}>
      <BackgroundImg backgroundImg={youtuberInfo.backgroundImg} />
      <Profile
        channelProfile={youtuberInfo.channelProfile}
        name={youtuberInfo.name}
        description={youtuberInfo.description}
        category={youtuberInfo.category}
      />
      <AnalysisMenu />
      <AnalysisReport />
    </section>
  );
};

export default Detail;
