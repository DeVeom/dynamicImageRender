import React from 'react';
import style from './AnalysisMenu.module.css';
import { useMutation, gql } from '@apollo/client';

const AnalysisMenu = ({ channelId }) => {
  const SEND_DATA = gql`
  mutation {
    generateScreenshot(channelId: "${channelId}")
  }
`;

  const [mutateFunction] = useMutation(SEND_DATA);

  return (
    <div className={style.analysisMenu}>
      <div className={style.analysisTextContainer}>
        <p className={style.analysisMenuText}>채널 분석</p>
        <p className={style.analysisMenuText}>영상 분석</p>
        <p className={style.analysisMenuText}>시청자 분석</p>
        <p className={style.analysisMenuText}>광고 단가</p>
        <p className={style.analysisMenuText}>관련 채널 분석</p>
      </div>
      <div className={style.analysisMenuText} onClick={mutateFunction}>
        임베디드 코드 버튼
      </div>
    </div>
  );
};

export default AnalysisMenu;
