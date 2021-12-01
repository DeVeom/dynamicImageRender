const dateTypeEnum = Object.freeze({ YYYYMMDD: 0, YYYYMM: 1, YYYY: 2 });

export const formatDateString = (dateObj, separator, dateType) => {
  if (!(dateType in dateTypeEnum)) {
    throw new Error('invalid dateType (type: YYYYMMDD, YYYYMM, YYYY)');
  }
  const localeString = dateObj.toLocaleDateString('ko-KR');
  const trimedLocaleString = localeString.replace(/(\s*)/g, '');

  const splittedArr = trimedLocaleString.split('.');
  if (splittedArr[1].length === 1) splittedArr[1] = '0' + splittedArr[1];
  if (splittedArr[2].length === 1) splittedArr[2] = '0' + splittedArr[2];

  splittedArr.pop();

  if (dateTypeEnum[dateType] > 0) splittedArr.pop();
  if (dateTypeEnum[dateType] > 1) splittedArr.pop();

  const resultString = splittedArr.join(separator);

  return resultString;
};

export const checkDateRegExp = (dateString) => {
  const dateRegExp = RegExp(
    /^\d{4}\/(0[1-9]|1[012])\/(0[1-9]|[12][0-9]|3[01])$/
  );

  return dateRegExp.test(dateString);
};

export const checkYearMonthRegExp = (yearMonthString) => {
  const yearMonthRegExp = RegExp(/^\d{4}\/(0[1-9]|1[012])$/);

  return yearMonthRegExp.test(yearMonthString);
};

export const checkYearRegExp = (yearString) => {
  const yearRegExp = RegExp(/^\d{4}$/);

  return yearRegExp.test(yearString);
};
