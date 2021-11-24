import React, { useState } from 'react';
import style from './AnalysisMenu.module.css';
import { useMutation, gql } from '@apollo/client';

const AnalysisMenu = ({ channelId }) => {
  const [imgUrl, setImgUrl] = useState('');

  const SEND_DATA = gql`
  mutation {
    generateScreenshot(channelId: "${channelId}")
  }
`;

  const [mutateFunction, { loading, error, data }] = useMutation(SEND_DATA);

  const handleMutation = async () => {
    const result = await mutateFunction();
    console.log(result);
    alert('코드가 복사되었습니다.');
  };

  return (
    <div className={style.analysisMenu}>
      <div className={style.analysisTextContainer}>
        <p className={style.analysisMenuText}>채널 분석</p>
        <p className={style.analysisMenuText}>영상 분석</p>
        <p className={style.analysisMenuText}>시청자 분석</p>
        <p className={style.analysisMenuText}>광고 단가</p>
        <p className={style.analysisMenuText}>관련 채널 분석</p>
      </div>
      <div className={style.analysisMenuText} onClick={handleMutation}>
        임베디드 코드 버튼
      </div>
    </div>
  );
};

export default AnalysisMenu;
