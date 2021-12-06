/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import style from './AnalysisMenu.module.css';
import { useMutation, gql } from '@apollo/client';
import Button from '@mui/material/Button';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DetailSpinner from '../../../components/Spinner/DetailSpinner';

const AnalysisMenu = ({ channelId, title }) => {
  const [isCopyOptionOpen, setIsCopyOptionOpen] = useState(false);
  const [layout, setLayout] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const modalEl = useRef();
  const handleCloseModal = ({ target }) => {
    if (isCopyOptionOpen && !modalEl.current?.contains(target))
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

  // eslint-disable-next-line no-unused-vars
  const [mutateFunction, { loading, error, data }] = useMutation(SEND_DATA);
  const handleMutation = async layoutType => {
    await setLayout(layoutType);
    const result = await mutateFunction();
    setImgUrl(result.data.generateScreenshot);
  };

  const useDidMountEffect = (func, deps) => {
    const didMount = useRef(false);
    useEffect(() => {
      if (didMount.current) func();
      else didMount.current = true;
    }, deps);
  };

  useDidMountEffect(() => {
    navigator.clipboard
      .writeText(
        `<a href='https://vling.net/channel/${channelId}'><img alt='${title}' src=${imgUrl} /></a>`
      )
      .then(() => {
        alert(`클립보드에 복사했습니다.`);
      })
      .catch(() => {
        alert(`복사 실패!`);
      });
  }, [imgUrl]);

  const copyLayoutOption = [
    {
      id: 1,
      size: '1050 X 350',
      layoutType: 'large',
    },
    {
      id: 2,
      size: '490 X 490',
      layoutType: 'small',
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
      {loading && (
        <ThemeProvider theme={theme}>
          <DetailSpinner className={style.spinner} />
        </ThemeProvider>
      )}
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
