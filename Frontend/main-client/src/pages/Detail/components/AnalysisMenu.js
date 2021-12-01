/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import style from './AnalysisMenu.module.css';
import { useMutation, gql } from '@apollo/client';
import Button from '@mui/material/Button';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const AnalysisMenu = ({ channelId }) => {
  const [isCopyOptionOpen, setIsCopyOptionOpen] = useState(false);
  const [layout, setLayout] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const modalEl = useRef();
  const handleCloseModal = ({ target }) => {
    if (isCopyOptionOpen && !modalEl.current.contains(target))
      setIsCopyOptionOpen(false);
  };

  useEffect(() => {
    window.addEventListener('click', handleCloseModal);
    return () => {
      window.removeEventListener('click', handleCloseModal);
    };
  });

  const handleCopyOption = () => {
    setIsCopyOptionOpen(!isCopyOptionOpen);
  };

  const SEND_DATA = gql`
    mutation {
      generateScreenshot(channelId: "${channelId}", layoutType: "${layout}")
    }
  `;
  const [mutateFunction, { loading, error, data }] = useMutation(SEND_DATA);
  const handleMutation = async layoutType => {
    const result = await mutateFunction();
    setLayout(layoutType);
    console.log(result.data.generateScreenshot);
    setImgUrl(result.data.generateScreenshot);
    navigator.clipboard.writeText(imgUrl);
    alert('코드가 복사되었습니다.');
  };

  const copyLayoutOption = [
    {
      id: 1,
      size: '1050 X 350',
      layoutType: 'LARGE',
    },
    {
      id: 2,
      size: '490 X 490',
      layoutType: 'SMALL',
    },
  ];

  const theme = createTheme({
    palette: {
      primary: {
        main: '#ff0044',
      },
    },
  });

  return (
    <div className={style.analysisMenu}>
      <div className={style.analysisTextContainer}>
        <p className={style.analysisMenuText}>채널 분석</p>
        <p className={style.analysisMenuText}>영상 분석</p>
        <p className={style.analysisMenuText}>시청자 분석</p>
        <p className={style.analysisMenuText}>광고 단가</p>
        <p className={style.analysisMenuText}>관련 채널 분석</p>
      </div>
      <div
        ref={modalEl}
        className={style.copyOption}
        style={
          isCopyOptionOpen
            ? { visibility: 'visible' }
            : { visibility: 'hidden' }
        }
      >
        <ul className={style.copyOptionList}>
          {copyLayoutOption.map(option => {
            return (
              <li
                key={option.id}
                className={style.copyOptionText}
                onClick={() => handleMutation(option.layoutType)}
              >
                {option.size}
              </li>
            );
          })}
        </ul>
      </div>
      <div className={style.copyBtn} onClick={handleCopyOption}>
        <ThemeProvider theme={theme}>
          <Button variant="outlined" startIcon={<ContentCopyRoundedIcon />}>
            COPY
          </Button>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default AnalysisMenu;
