import React, { useState } from 'react';
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import Tooltip from '@mui/material/Tooltip';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { handleCategory } from '../../../../utils/KorCategory';
import style from '../../List.module.css';

const PcCard = props => {
  const { data, i, handleHoveredDesc } = props;
  const { REACT_APP_LINK_TO_DETAIL } = process.env;
  const [newWindowName, setNewWindowName] = useState(0);
  const theme = createTheme({
    palette: {
      black: {
        main: '#918e8e',
      },
    },
  });

  <handleCategory />;

  return (
    <section className={style.cardWrapper}>
      <div className={style.rank}>{i + 1}</div>
      <img
        onClick={() => {
          setNewWindowName(newWindowName + 1);
          return window.open(
            `${REACT_APP_LINK_TO_DETAIL}/search/${data.channelId}`,
            `ToDetailPage${newWindowName}`
          );
        }}
        src={data.thumbnails}
        alt="profile"
        className={style.profile}
      />
      <section className={style.infoWrapper}>
        <div
          className={style.infoName}
          onClick={() => {
            setNewWindowName(newWindowName + 1);
            return window.open(
              `${REACT_APP_LINK_TO_DETAIL}/search/${data.channelId}`,
              `ToDetailPage${newWindowName}`
            );
          }}
        >
          {data.title}
        </div>
        <div
          className={style.hoveredDescription}
          onClick={() => {
            setNewWindowName(newWindowName + 1);
            return window.open(
              `${REACT_APP_LINK_TO_DETAIL}/search/${data.channelId}`,
              `ToDetailPage${newWindowName}`
            );
          }}
        >
          {data.description.length > 400 ? (
            <Tooltip
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 600 }}
              enterDelay={500}
              leaveDelay={50}
              title={`${data.description}`}
              placement="top-start"
              followCursor
            >
              <Box>{data.description}</Box>
            </Tooltip>
          ) : (
            <Tooltip
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 600 }}
              enterDelay={500}
              leaveDelay={50}
              title={`${data.description}`}
              placement="bottom-start"
              followCursor
            >
              <Box>{data.description}</Box>
            </Tooltip>
          )}
        </div>
        <div className={style.categoryNclipboard}>
          {data.category.map((category, i) => {
            return (
              <div className={style.infoCategory} key={i}>
                {handleCategory(category)}
              </div>
            );
          })}
          <div className={style.clipboardWrapper}>
            <ThemeProvider theme={theme}>
              <Tooltip
                title="위 유튜버 정보를 복사합니다."
                enterDelay={500}
                leaveDelay={50}
                placement="top"
                followCursor
              >
                <Box>
                  <div className={style.copyedDesc}>
                    <Button
                      variant="text"
                      color="black"
                      size="small"
                      onClick={() => {
                        handleHoveredDesc();
                        navigator.clipboard.writeText(`${data.description}`);
                      }}
                      startIcon={<ContentCopyRoundedIcon />}
                    ></Button>
                  </div>
                </Box>
              </Tooltip>
            </ThemeProvider>
          </div>
        </div>
      </section>
      <section className={style.statusWrapper}>
        <ul>
          <li>
            <div className={style.subscriberStatus}>
              <img
                className={style.subscriberIconImg}
                src="https://vling.net/media/icons/channel-subs-icon.png"
                alt="구독자 아이콘"
              />
              <p>구독자 수</p>
            </div>
            <div className={style.countStatus}>
              {data.subscriberCount > 10000
                ? Math.round(data.subscriberCount * 0.0001) + '만'
                : data.subscriberCount}
            </div>
            <div className={style.countChangeStatus}>
              <img
                className={style.countChangeImg}
                src="https://vling.net/media/icons/statusChange_up.png"
                alt="구독자 수 변화량 아이콘"
              />
              {data.subscriberChange.toLocaleString()}
            </div>
          </li>
          <li>
            <div className={style.subscriberStatus}>
              <img
                className={style.subscriberIconImg}
                src="https://vling.net/media/icons/channel-subs-icon.png"
                alt="조회수 아이콘"
              />
              <p>일일 조회 수</p>
            </div>
            <div className={style.countStatus}>
              {data.dailyViewCount > 10000
                ? Math.round(data.dailyViewCount * 0.0001) + '만'
                : data.dailyViewCount}
            </div>
            <div
              className={
                (data.dailyViewChange / data.dailyViewCount).toFixed(2) >= 0
                  ? style.countChangeStatus
                  : style.minusCountChangeStatus
              }
            >
              {`${(data.dailyViewChange / data.dailyViewCount).toFixed(2)}%`}
            </div>
          </li>
          <li>
            <div className={style.subscriberStatus}>
              <img
                className={style.subscriberIconImg}
                src="https://vling.net/media/icons/channel-subs-icon.png"
                alt="영상별 평균 조회수 아이콘"
              />
              <p>영상별 평균 조회수</p>
            </div>
            <div className={style.countStatus}>
              {data.averageVideoViewCount > 10000
                ? Math.round(data.averageVideoViewCount * 0.0001) + '만'
                : data.averageVideoViewCount}
            </div>
          </li>
        </ul>
      </section>
      <section className={style.imageClipWrapper}>
        <img
          className={style.imageClipWrapperImg}
          src={data.video[0].thumbnails}
          alt="최근 동영상"
        />
      </section>
    </section>
  );
};

export default PcCard;
