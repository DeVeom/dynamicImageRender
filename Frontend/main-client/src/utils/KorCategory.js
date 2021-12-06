export const handleCategory = category => {
  let korCategory = '';
  switch (category) {
    case 'FASHION':
      korCategory = '패션';
      break;
    case 'BEAUTY':
      korCategory = '뷰티';
      break;
    case 'FOOD':
      korCategory = '푸드/먹방';
      break;
    case 'ENTN':
      korCategory = '엔터테인먼트';
      break;
    case 'LIFE':
      korCategory = 'Vlog/일상';
      break;
    case 'TRAVEL':
      korCategory = '여행';
      break;
    case 'ASMR':
      korCategory = 'ASMR';
      break;
    case 'GAME':
      korCategory = '게임';
      break;
    case 'PET':
      korCategory = '펫/동식물';
      break;
    case 'TECH':
      korCategory = 'IT/과학기술';
      break;
    case 'FILM':
      korCategory = '영화/애니';
      break;
    case 'CAR':
      korCategory = '자동차';
      break;
    case 'MUSIC':
      korCategory = '음악';
      break;
    case 'SPORTS':
      korCategory = '스포츠';
      break;
    case 'POLITICS':
      korCategory = '시사/정치';
      break;
    case 'EDU':
      korCategory = '교육';
      break;
    case 'SOCIETY':
      korCategory = '사회/종교';
      break;
    case 'KIDS':
      korCategory = '키즈';
      break;
    case 'ECONOMY':
      korCategory = '경제';
      break;
    case 'INFO':
      korCategory = '지식/정보';
      break;
    case 'NEWS':
      korCategory = '뉴스';
      break;
    case 'ETC':
      korCategory = '기타';
      break;
    default:
      korCategory = '기타';
      break;
  }
  return korCategory;
};
