import React from 'react';
import style from './SortBox.module.css';

const SortBox = props => {
  const { clickSortBox, changeSortBoxColor, textColor } = props;

  return (
    <section className={style.sortWrapper}>
      <ul className={style.sortTitle}>
        <li
          onClick={() => {
            clickSortBox('subscriberCount');
          }}
          className={
            textColor === 'a'
              ? style.sortTitleChecked
              : style.sortTitleNotChecked
          }
        >
          <img
            className={
              textColor === 'a'
                ? style.subscriberCheckedImg
                : style.subscriberNotCheckedImg
            }
            src="https://vling.net/media/icons/check_icon2.png"
            alt="check"
          />
          <span
            onClick={() => {
              changeSortBoxColor('a');
            }}
            className={style.subscriberSort}
          >
            구독자 순
          </span>
        </li>
        <li
          onClick={() => {
            clickSortBox('dailyViewCount');
          }}
          className={
            textColor === 'b'
              ? style.sortTitleChecked
              : style.sortTitleNotChecked
          }
        >
          <img
            className={
              textColor === 'b'
                ? style.subscriberCheckedImg
                : style.subscriberNotCheckedImg
            }
            src="https://vling.net/media/icons/check_icon2.png"
            alt="check"
          />
          <span
            onClick={() => {
              changeSortBoxColor('b');
            }}
            className={style.subscriberSort}
          >
            일일 조회수 순
          </span>
        </li>
        <li
          onClick={() => {
            clickSortBox('subscriberChange');
          }}
          className={
            textColor === 'c'
              ? style.sortTitleChecked
              : style.sortTitleNotChecked
          }
        >
          <img
            className={
              textColor === 'c'
                ? style.subscriberCheckedImg
                : style.subscriberNotCheckedImg
            }
            src="https://vling.net/media/icons/check_icon2.png"
            alt="check"
          />
          <span
            onClick={() => {
              changeSortBoxColor('c');
            }}
            className={style.subscriberSort}
          >
            구독자 급상승 순
          </span>
        </li>
        <li
          onClick={() => {
            clickSortBox('averageVideoViewCount');
          }}
          className={
            textColor === 'd'
              ? style.sortTitleChecked
              : style.sortTitleNotChecked
          }
        >
          <img
            className={
              textColor === 'd'
                ? style.subscriberCheckedImg
                : style.subscriberNotCheckedImg
            }
            src="https://vling.net/media/icons/check_icon2.png"
            alt="check"
          />
          <span
            onClick={() => {
              changeSortBoxColor('d');
            }}
            className={style.subscriberSort}
          >
            영상 평균 조회수 순
          </span>
        </li>
        <li
          onClick={() => {
            clickSortBox('dailyAverageViewCount');
          }}
          className={
            textColor === 'e'
              ? style.sortTitleChecked
              : style.sortTitleNotChecked
          }
        >
          <img
            className={
              textColor === 'e'
                ? style.subscriberCheckedImg
                : style.subscriberNotCheckedImg
            }
            src="https://vling.net/media/icons/check_icon2.png"
            alt="check"
          />
          <span
            onClick={() => {
              changeSortBoxColor('e');
            }}
            className={style.subscriberSort}
          >
            30일 조회수 순
          </span>
        </li>
      </ul>
    </section>
  );
};

export default SortBox;
