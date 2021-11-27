let formatDateString;

if (process.env.NODE_ENV === 'production') {
  formatDateString = (dateObj, separator) => {
    const localeString = dateObj.toLocaleDateString();

    const splittedArr = localeString.split('/');

    const year = splittedArr.pop();
    splittedArr.unshift(year);

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
