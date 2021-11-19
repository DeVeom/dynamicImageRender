import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import style from './Detail.module.css';
import BackgroundImg from './components/BackgroundImg';
import Profile from './components/Profile';
import AnalysisMenu from './components/AnalysisMenu';
import AnalysisReport from './components/AnalysisReport';

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

  const GET_DATA = gql`
    query {
      channelForGuest(id: "UCenG5DES1t6SYGrgzGNzWzQ") {
        channelId
        title
        description
        banner
        thumbnails
        nations
        category
        isFavorite
        links {
          name
          href
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_DATA);
  console.log(loading, error, data);

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
