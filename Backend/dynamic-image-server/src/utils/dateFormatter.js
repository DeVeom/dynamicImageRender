export const formatDateString = (dateObj, separator) => {
  const localeString = dateObj.toLocaleDateString();
  const trimedLocaleString = localeString.replace(/(\s*)/g, '');

  const splittedArr = trimedLocaleString.split('.');
  splittedArr.pop();

  const dashedString = splittedArr.join(separator);

  return dashedString;
};
