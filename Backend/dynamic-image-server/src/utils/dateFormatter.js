export const formatDateString = (dateObj, separator) => {
  const localeString = dateObj.toLocaleDateString('ko-KR');
  const trimedLocaleString = localeString.replace(/(\s*)/g, '');

  const splittedArr = trimedLocaleString.split('.');
  splittedArr.pop();

  const resultString = splittedArr.join(separator);

  return resultString;
};
