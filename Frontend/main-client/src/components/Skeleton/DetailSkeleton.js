import React from 'react';
import style from './DetailSkeleton.module.css';
import { useMediaQuery } from 'react-responsive';
import Button from '@mui/material/Button';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const DetailSkeleton = () => {
  const isPc = useMediaQuery({
    query: '(min-width:1051px)',
  });
  const isTablet = useMediaQuery({
    query: '(min-width:768px) and (max-width:1050px)',
  });
  const isMobile = useMediaQuery({
    query: '(max-width:767px)',
  });

  const theme = createTheme({
    palette: {
      primary: {
        main: '#ff0044',
      },
    },
  });

  return (
    <section className={style.detailContainer}>
      <div className={style.backgroundImgContainer}>
        <img
          className={style.backgroundImg}
          alt="버즈앤비"
          src="https://i.esdrop.com/d/dzl8ervbasc7/w8DZhGBn4t.png"
        />
      </div>
      <div className={style.profile}>
        <div className={style.profileContainer}>
          <div className={style.profileImgContainer}></div>
          <div className={style.profileTextContainer}>
            <div className={style.channelCategoryContainer}></div>
          </div>
        </div>
        <div className={style.profileRigthContainer}></div>
      </div>
      <div className={style.analysisMenu}>
        <div className={style.analysisTextContainer}>
          <p className={style.analysisMenuText}>채널 분석</p>
        </div>
        <div className={style.copyBtn}>
          <ThemeProvider theme={theme}>
            <Button variant="outlined" startIcon={<ContentCopyRoundedIcon />}>
              COPY
            </Button>
          </ThemeProvider>
        </div>
      </div>
      {isPc && (
        <div>
          <p className={style.performanceReportTitle}>Perfrmance 요약</p>
          <div className={style.svgReportForPcContainer}>
            <div className={style.leftReportForPcContainer}></div>
            <div className={style.rightReportForPcContainer}></div>
          </div>
        </div>
      )}
      {isTablet && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className={style.svgReportForTabletContainer}
          viewBox="0 0 768 650"
        >
          <text className={style.performanceReportTitle} x="0" y="30">
            Performance 요약
          </text>
          <rect x="16" y="50" rx="5" ry="5" width="736" height="268"></rect>
          <rect x="16" y="345" rx="5" ry="5" width="736" height="290"></rect>
        </svg>
      )}
      {isMobile && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className={style.svgReportForMobileContainer}
          viewBox="0 0 490 488"
        >
          <rect x="20" y="20" rx="5" ry="5" width="450" height="147"></rect>
          <rect x="20" y="195" rx="5" ry="5" width="450" height="294"></rect>
        </svg>
      )}
    </section>
  );
};

export default DetailSkeleton;
