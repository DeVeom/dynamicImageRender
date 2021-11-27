let formatDateString;

if (process.env.NODE_ENV === 'production') {
  formatDateString = (dateObj, separator) => {
    const localeString = dateObj.toLocaleDateString();

    const splittedArr = localeString.split('/');
    const temp = splittedArr[0];
    splittedArr[0] = splittedArr[2];
    splittedArr[2] = temp;

    const resultString = splittedArr.join(separator);

    return resultString;
  };
} else {
  formatDateString = (dateObj, separator) => {
    const localeString = dateObj.toLocaleDateString();
    const trimedLocaleString = localeString.replace(/(\s*)/g, '');

    const splittedArr = trimedLocaleString.split('.');
    splittedArr.pop();

    const resultString = splittedArr.join(separator);

    return resultString;
  };
}

export { formatDateString };
