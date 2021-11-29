export const dateTypeEnum = Object.freeze({ YYYYMMDD: 0, YYYYMM: 1, YYYY: 2 });

export const formatDateString = (dateObj, separator, dateType) => {
  if (!(dateType in dateTypeEnum)) {
    throw new Error('invalid dateType (type: YYYYMMDD, YYYYMM, YYYY)');
  }
  const localeString = dateObj.toLocaleDateString('ko-KR');
  const trimedLocaleString = localeString.replace(/(\s*)/g, '');

  const splittedArr = trimedLocaleString.split('.');
  splittedArr.pop();

  if (dateType > 0) splittedArr.pop();
  if (dateType > 1) splittedArr.pop();

  const resultString = splittedArr.join(separator);

  return resultString;
};
